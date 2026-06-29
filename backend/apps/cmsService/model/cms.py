from sqlalchemy import Column, String, Boolean, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime, timezone
from core.config import Base


def get_utc_now():
    return datetime.now(timezone.utc)


class Blog(Base):
    __tablename__ = "blogs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(Text, nullable=False)
    slug = Column(Text, nullable=False, unique=True, index=True)
    description = Column(Text)
    content = Column(Text, nullable=False)
    author = Column(Text, nullable=False)
    published = Column(Boolean, default=False, index=True)
    is_featured = Column(Boolean, default=False)
    tag_type = Column(Text, index=True)
    created_by = Column(Text)
    updated_by = Column(Text)
    created_at = Column(DateTime(timezone=True), default=get_utc_now, index=True)
    updated_at = Column(DateTime(timezone=True), default=get_utc_now, onupdate=get_utc_now)


class CaseStudy(Base):
    __tablename__ = "case_studies"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(Text, nullable=False)
    slug = Column(Text, nullable=False, unique=True, index=True)
    subtitle = Column(Text)
    company_name = Column(Text, nullable=False, default="", index=True)
    industry = Column(Text)
    author = Column(Text)
    content = Column(Text)
    published = Column(Boolean, default=False, index=True)
    is_featured = Column(Boolean, default=False)
    tag_type = Column(Text, index=True)
    seo_title = Column(Text)
    seo_description = Column(Text)
    created_by = Column(Text)
    updated_by = Column(Text)
    created_at = Column(DateTime(timezone=True), default=get_utc_now, index=True)
    updated_at = Column(DateTime(timezone=True), default=get_utc_now, onupdate=get_utc_now)


class MeetingRequest(Base):
    __tablename__ = "meeting_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    email = Column(Text, nullable=False)
    phone = Column(Text)
    organization = Column(Text, nullable=False)
    purpose = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_utc_now, index=True)
