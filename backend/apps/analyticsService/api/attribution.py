from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import List

from apps.shared.customResponse import custom_response
from core.database import get_db
from apps.analyticsService.model.attribution import EmployeeRevenueAttribution
from apps.analyticsService.schema.attribution import AttributionGet

router = APIRouter(prefix="/attribution", tags=["Attribution"])

@router.get("/", response_model=None)
def get_attributions(
    skip: int = 0, limit: int = 100, session: Session = Depends(get_db)
):
    try:
        stmt = select(EmployeeRevenueAttribution).offset(skip).limit(limit)
        results = session.scalars(stmt).all()
        total = session.query(EmployeeRevenueAttribution).count()
        data = [AttributionGet.model_validate(r).model_dump(mode="json") for r in results]
        return custom_response(data, "Attributions retrieved successfully", 200, total=total)
    except Exception as e:
        return custom_response(None, "Attribution retrieval failed", 500, str(e))
