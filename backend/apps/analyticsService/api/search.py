from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_, String, cast
from typing import List, Optional
from uuid import UUID

from core.database import get_db
from apps.shared.customResponse import custom_response

# Models
from apps.employeeService.model.employee import Employee
from apps.employeeService.model.department import Department
from apps.employeeService.model.designation import Designation
from apps.projectService.model.project import Project
from apps.projectService.model.vendor import Vendor
from apps.financeService.model.client import Client
from apps.financeService.model.invoice import Invoice
from apps.financeService.model.reimbursement import Reimbursement
from apps.shared.security import verify_token

router = APIRouter(prefix="/search", tags=["Advanced Search"])

@router.get("/")
def advanced_search(
    q: str, 
    type: str, 
    limit: int = 20,
    session: Session = Depends(get_db),
    current_user = Depends(verify_token)
):
    """
    Advanced universal search service that returns complete end-to-end entity information.
    """
    try:
        results = []
        q_term = f"%{q}%"
        
        def serialize_entity(entity, visited=None):
            if visited is None:
                visited = set()
            
            # Simple cyclic reference breaking
            entity_id = id(entity)
            if entity_id in visited:
                return {"id": str(getattr(entity, "id", None))}
            
            visited.add(entity_id)
            
            res = {}
            for col in entity.__table__.columns:
                val = getattr(entity, col.name)
                res[col.name] = str(val) if isinstance(val, UUID) else val
                
            # Relationships
            for rel in entity.__mapper__.relationships:
                rel_val = getattr(entity, rel.key, None)
                if rel_val is None:
                    res[rel.key] = None
                elif isinstance(rel_val, list):
                    # Only nest one level deep to avoid massive payloads
                    res[rel.key] = [
                        {c.name: str(getattr(item, c.name)) if isinstance(getattr(item, c.name), UUID) else getattr(item, c.name) for c in item.__table__.columns} 
                        for item in rel_val
                    ]
                else:
                    res[rel.key] = {c.name: str(getattr(rel_val, c.name)) if isinstance(getattr(rel_val, c.name), UUID) else getattr(rel_val, c.name) for c in rel_val.__table__.columns}
            
            return res

        if type == "employee":
            query = session.query(Employee).options(
                joinedload(Employee.department),
                joinedload(Employee.designation),
                joinedload(Employee.projects),
                joinedload(Employee.assignments),
                joinedload(Employee.reimbursements)
            ).filter(
                or_(
                    Employee.first_name.ilike(q_term),
                    Employee.last_name.ilike(q_term),
                    Employee.email.ilike(q_term),
                    Employee.user_code.ilike(q_term),
                )
            )
            entities = query.limit(limit).all()
            results = [serialize_entity(e) for e in entities]
            
        elif type == "department":
            query = session.query(Department).options(
                joinedload(Department.employees),
                joinedload(Department.projects),
                joinedload(Department.software_tools)
            ).filter(
                or_(
                    Department.name.ilike(q_term),
                    Department.description.ilike(q_term)
                )
            )
            entities = query.limit(limit).all()
            results = [serialize_entity(e) for e in entities]
            
        elif type == "designation":
            query = session.query(Designation).options(
                joinedload(Designation.employees)
            ).filter(
                or_(
                    Designation.name.ilike(q_term),
                    Designation.grade.ilike(q_term),
                    Designation.pay_band.ilike(q_term)
                )
            )
            entities = query.limit(limit).all()
            results = [serialize_entity(e) for e in entities]
            
        elif type == "project":
            query = session.query(Project).options(
                joinedload(Project.department),
                joinedload(Project.owner),
                joinedload(Project.client),
                joinedload(Project.assignments),
                joinedload(Project.costs),
                joinedload(Project.revenues),
                joinedload(Project.invoices)
            ).filter(
                or_(
                    Project.name.ilike(q_term),
                    Project.project_type.ilike(q_term),
                    Project.status.ilike(q_term)
                )
            )
            entities = query.limit(limit).all()
            results = [serialize_entity(e) for e in entities]
            
        elif type == "vendor":
            query = session.query(Vendor).options(
                joinedload(Vendor.costs)
            ).filter(
                or_(
                    Vendor.name.ilike(q_term),
                    Vendor.service_type.ilike(q_term)
                )
            )
            entities = query.limit(limit).all()
            results = [serialize_entity(e) for e in entities]
            
        elif type == "client":
            query = session.query(Client).options(
                joinedload(Client.projects),
                joinedload(Client.invoices),
                joinedload(Client.revenues)
            ).filter(
                or_(
                    Client.company_name.ilike(q_term),
                    Client.industry.ilike(q_term),
                    Client.contact_email.ilike(q_term)
                )
            )
            entities = query.limit(limit).all()
            results = [serialize_entity(e) for e in entities]
            
        elif type == "invoice":
            query = session.query(Invoice).options(
                joinedload(Invoice.client),
                joinedload(Invoice.project),
                joinedload(Invoice.revenues)
            ).filter(
                or_(
                    Invoice.status.ilike(q_term),
                    Invoice.payment_terms.ilike(q_term),
                    cast(Invoice.amount, String).ilike(q_term)
                )
            )
            entities = query.limit(limit).all()
            results = [serialize_entity(e) for e in entities]
            
        elif type == "reimbursement":
            query = session.query(Reimbursement).options(
                joinedload(Reimbursement.employee)
            ).filter(
                or_(
                    Reimbursement.status.ilike(q_term),
                    Reimbursement.description.ilike(q_term),
                    cast(Reimbursement.claim_amount, String).ilike(q_term)
                )
            )
            entities = query.limit(limit).all()
            results = [serialize_entity(e) for e in entities]

        return custom_response(results, f"Search results for {type}", 200, total=len(results))

    except Exception as e:
        return custom_response(None, "Search failed", 500, str(e))
