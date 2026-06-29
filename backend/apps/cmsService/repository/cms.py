from sqlalchemy.orm import Session
from typing import Optional, List
import uuid

from apps.cmsService.model.cms import Blog, CaseStudy, MeetingRequest
from apps.cmsService.schema.cms import (
    BlogCreate, BlogUpdate,
    CaseStudyCreate, CaseStudyUpdate,
    MeetingRequestCreate,
)


# ─── Blog Repository ──────────────────────────────────────────────────────────

def get_blogs(db: Session, published: Optional[bool] = None) -> List[Blog]:
    q = db.query(Blog)
    if published is not None:
        q = q.filter(Blog.published == published)
    return q.order_by(Blog.created_at.desc()).all()


def get_blog_by_id(db: Session, blog_id: str) -> Optional[Blog]:
    return db.query(Blog).filter(Blog.id == uuid.UUID(blog_id)).first()


def get_blog_by_slug(db: Session, slug: str) -> Optional[Blog]:
    return db.query(Blog).filter(Blog.slug == slug).first()


def create_blog(db: Session, data: BlogCreate) -> Blog:
    blog = Blog(**data.model_dump())
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog


def update_blog(db: Session, blog_id: str, data: BlogUpdate) -> Optional[Blog]:
    blog = get_blog_by_id(db, blog_id)
    if not blog:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(blog, key, value)
    db.commit()
    db.refresh(blog)
    return blog


def delete_blog(db: Session, blog_id: str) -> bool:
    blog = get_blog_by_id(db, blog_id)
    if not blog:
        return False
    db.delete(blog)
    db.commit()
    return True


# ─── CaseStudy Repository ─────────────────────────────────────────────────────

def get_case_studies(db: Session, published: Optional[bool] = None) -> List[CaseStudy]:
    q = db.query(CaseStudy)
    if published is not None:
        q = q.filter(CaseStudy.published == published)
    return q.order_by(CaseStudy.created_at.desc()).all()


def get_case_study_by_id(db: Session, cs_id: str) -> Optional[CaseStudy]:
    return db.query(CaseStudy).filter(CaseStudy.id == uuid.UUID(cs_id)).first()


def get_case_study_by_slug(db: Session, slug: str) -> Optional[CaseStudy]:
    return db.query(CaseStudy).filter(CaseStudy.slug == slug).first()


def create_case_study(db: Session, data: CaseStudyCreate) -> CaseStudy:
    cs = CaseStudy(**data.model_dump())
    db.add(cs)
    db.commit()
    db.refresh(cs)
    return cs


def update_case_study(db: Session, cs_id: str, data: CaseStudyUpdate) -> Optional[CaseStudy]:
    cs = get_case_study_by_id(db, cs_id)
    if not cs:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(cs, key, value)
    db.commit()
    db.refresh(cs)
    return cs


def delete_case_study(db: Session, cs_id: str) -> bool:
    cs = get_case_study_by_id(db, cs_id)
    if not cs:
        return False
    db.delete(cs)
    db.commit()
    return True


# ─── MeetingRequest Repository ────────────────────────────────────────────────

def get_meeting_requests(db: Session) -> List[MeetingRequest]:
    return db.query(MeetingRequest).order_by(MeetingRequest.created_at.desc()).all()


def create_meeting_request(db: Session, data: MeetingRequestCreate) -> MeetingRequest:
    req = MeetingRequest(**data.model_dump())
    db.add(req)
    db.commit()
    db.refresh(req)
    return req
