import os
from neo4j import GraphDatabase

NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "password")

driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
with driver.session() as session:
    nodes_result = session.run("MATCH (n) RETURN n LIMIT 2")
    for record in nodes_result:
        n = record["n"]
        print(f"element_id: {n.element_id}")
        print(f"labels: {n.labels}")
        print(f"properties: {dict(n)}")
driver.close()
