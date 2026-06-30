import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import uuid
from datetime import datetime
from sqlalchemy import create_engine, text

def seed():
    db_url = os.getenv("POSTGRES_URL", "postgresql://postgres:postgres@db:5432/brain")
    engine = create_engine(db_url)
    
    with engine.begin() as conn:
        emp_res = conn.execute(text("SELECT id FROM employee LIMIT 1"))
        emp_id = emp_res.fetchone()[0]
        
        proj_res = conn.execute(text("SELECT id FROM project LIMIT 1"))
        proj_id = proj_res.fetchone()[0]
        
        if emp_id and proj_id:
            attr_id = str(uuid.uuid4())
            calc_at = datetime.utcnow()
            conn.execute(text("""
                INSERT INTO employee_revenue_attribution (id, employee_id, project_id, attributed_revenue, roi_percentage, utilization_percentage, calculated_at)
                VALUES (:id, :emp, :proj, 45000.00, 12.50, 80.00, :calc_at)
            """), {"id": attr_id, "emp": emp_id, "proj": proj_id, "calc_at": calc_at})
            print("Employee Revenue Attribution seeded successfully!")

if __name__ == '__main__':
    seed()
