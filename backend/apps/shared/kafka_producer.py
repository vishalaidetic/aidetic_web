from kafka import KafkaProducer
import json
import os
import logging
import threading

logger = logging.getLogger(__name__)


class BrainKafkaProducer:
    """
    Non-blocking Kafka producer.

    The `get_producer()` call previously happened synchronously inside every
    DB event (after_insert / after_update / after_delete), which caused up to
    a 60-second TCP connection timeout when Kafka was unreachable.

    This version:
    - Initialises the producer once in a background daemon thread so it never
      blocks the main request/response cycle.
    - `publish_event()` silently no-ops when the producer is not yet ready or
      when Kafka is down.
    """
    KAFKA_BOOTSTRAP_SERVERS = os.getenv("KAFKA_SERVERS", "localhost:9092")
    _producer = None
    _lock = threading.Lock()
    _init_attempted = False

    @classmethod
    def _init_producer_bg(cls):
        """Called once in a background thread — never blocks HTTP requests."""
        try:
            producer = KafkaProducer(
                bootstrap_servers=cls.KAFKA_BOOTSTRAP_SERVERS,
                value_serializer=lambda v: json.dumps(v).encode("utf-8"),
                retries=3,
                request_timeout_ms=5_000,     # 5 s connect timeout
                api_version_auto_timeout_ms=5_000,
            )
            with cls._lock:
                cls._producer = producer
            logger.info("Kafka producer initialised successfully.")
        except Exception as e:
            logger.warning(f"Kafka producer unavailable (events will be skipped): {e}")

    @classmethod
    def _ensure_producer(cls):
        with cls._lock:
            if cls._init_attempted:
                return
            cls._init_attempted = True
        # Kick off non-blocking initialisation
        t = threading.Thread(target=cls._init_producer_bg, daemon=True)
        t.start()

    @classmethod
    def publish_event(cls, topic: str, event_type: str, data: dict):
        cls._ensure_producer()
        with cls._lock:
            producer = cls._producer
        if producer is None:
            # Kafka not ready yet or unavailable — skip silently
            return
        payload = {
            "event_type": event_type,
            "data": data,
        }
        try:
            producer.send(topic, payload)
            # fire-and-forget — no .get() block
        except Exception as e:
            logger.warning(f"Kafka publish skipped ({event_type}): {e}")


class EventBus:
    def publish_action(self, action: dict, context: dict):
        BrainKafkaProducer.publish_event("enterprise-decisions", "business_decision_triggered", {
            "action": action,
            "context": context,
        })


event_bus = EventBus()
