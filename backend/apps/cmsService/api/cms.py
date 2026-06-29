from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from core.database import get_db
from apps.cmsService.schema.cms import (
    BlogCreate, BlogUpdate, BlogResponse,
    CaseStudyCreate, CaseStudyUpdate, CaseStudyResponse,
    MeetingRequestCreate, MeetingRequestResponse,
)
from apps.cmsService.repository import cms as repo

router = APIRouter(prefix="/cms", tags=["CMS"])


# ─── Blogs ────────────────────────────────────────────────────────────────────

@router.get("/blogs", response_model=List[BlogResponse])
def list_blogs(published: Optional[bool] = None, db: Session = Depends(get_db)):
    return repo.get_blogs(db, published=published)


@router.get("/blogs/{blog_id}", response_model=BlogResponse)
def get_blog(blog_id: str, db: Session = Depends(get_db)):
    blog = repo.get_blog_by_id(db, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@router.get("/blogs/slug/{slug}", response_model=BlogResponse)
def get_blog_by_slug(slug: str, db: Session = Depends(get_db)):
    blog = repo.get_blog_by_slug(db, slug)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@router.post("/blogs", response_model=BlogResponse, status_code=201)
def create_blog(data: BlogCreate, db: Session = Depends(get_db)):
    return repo.create_blog(db, data)


@router.patch("/blogs/{blog_id}", response_model=BlogResponse)
def update_blog(blog_id: str, data: BlogUpdate, db: Session = Depends(get_db)):
    blog = repo.update_blog(db, blog_id, data)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@router.delete("/blogs/{blog_id}", status_code=204)
def delete_blog(blog_id: str, db: Session = Depends(get_db)):
    if not repo.delete_blog(db, blog_id):
        raise HTTPException(status_code=404, detail="Blog not found")


# ─── Case Studies ─────────────────────────────────────────────────────────────

@router.get("/case-studies", response_model=List[CaseStudyResponse])
def list_case_studies(published: Optional[bool] = None, db: Session = Depends(get_db)):
    return repo.get_case_studies(db, published=published)


@router.get("/case-studies/{cs_id}", response_model=CaseStudyResponse)
def get_case_study(cs_id: str, db: Session = Depends(get_db)):
    cs = repo.get_case_study_by_id(db, cs_id)
    if not cs:
        raise HTTPException(status_code=404, detail="Case study not found")
    return cs


@router.get("/case-studies/slug/{slug}", response_model=CaseStudyResponse)
def get_case_study_by_slug(slug: str, db: Session = Depends(get_db)):
    cs = repo.get_case_study_by_slug(db, slug)
    if not cs:
        raise HTTPException(status_code=404, detail="Case study not found")
    return cs


@router.post("/case-studies", response_model=CaseStudyResponse, status_code=201)
def create_case_study(data: CaseStudyCreate, db: Session = Depends(get_db)):
    return repo.create_case_study(db, data)


@router.patch("/case-studies/{cs_id}", response_model=CaseStudyResponse)
def update_case_study(cs_id: str, data: CaseStudyUpdate, db: Session = Depends(get_db)):
    cs = repo.update_case_study(db, cs_id, data)
    if not cs:
        raise HTTPException(status_code=404, detail="Case study not found")
    return cs


@router.delete("/case-studies/{cs_id}", status_code=204)
def delete_case_study(cs_id: str, db: Session = Depends(get_db)):
    if not repo.delete_case_study(db, cs_id):
        raise HTTPException(status_code=404, detail="Case study not found")


# ─── Meeting Requests ─────────────────────────────────────────────────────────

@router.get("/meeting-requests", response_model=List[MeetingRequestResponse])
def list_meeting_requests(db: Session = Depends(get_db)):
    return repo.get_meeting_requests(db)


@router.post("/meeting-requests", response_model=MeetingRequestResponse, status_code=201)
def create_meeting_request(data: MeetingRequestCreate, db: Session = Depends(get_db)):
    return repo.create_meeting_request(db, data)
