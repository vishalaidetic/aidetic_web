from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime
import uuid


# ─── Blog Schemas ─────────────────────────────────────────────────────────────

class BlogCreate(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    content: str
    author: str
    featured_image: Optional[str] = None
    published: bool = False
    is_featured: bool = False
    tag_type: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    created_by: Optional[str] = None
    updated_by: Optional[str] = None


class BlogUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    featured_image: Optional[str] = None
    published: Optional[bool] = None
    is_featured: Optional[bool] = None
    tag_type: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    updated_by: Optional[str] = None


class BlogResponse(BaseModel):
    id: uuid.UUID
    title: str
    slug: str
    description: Optional[str] = None
    content: str
    author: str
    featured_image: Optional[str] = None
    published: bool
    is_featured: bool
    tag_type: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    created_by: Optional[str] = None
    updated_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ─── CaseStudy Schemas ────────────────────────────────────────────────────────

class CaseStudyCreate(BaseModel):
    title: str
    slug: str
    subtitle: Optional[str] = None
    company_name: str = ""
    company_logo: Optional[str] = None
    industry: Optional[str] = None
    featured_image: Optional[str] = None
    author: Optional[str] = None
    content: Optional[str] = None
    
    problem: Optional[Any] = None
    solution: Optional[Any] = None
    results: Optional[Any] = None
    metrics: Optional[Any] = None
    testimonial: Optional[Any] = None
    
    published: bool = False
    is_featured: bool = False
    tag_type: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    created_by: Optional[str] = None
    updated_by: Optional[str] = None


class CaseStudyUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    subtitle: Optional[str] = None
    company_name: Optional[str] = None
    company_logo: Optional[str] = None
    industry: Optional[str] = None
    featured_image: Optional[str] = None
    author: Optional[str] = None
    content: Optional[str] = None
    
    problem: Optional[Any] = None
    solution: Optional[Any] = None
    results: Optional[Any] = None
    metrics: Optional[Any] = None
    testimonial: Optional[Any] = None
    
    published: Optional[bool] = None
    is_featured: Optional[bool] = None
    tag_type: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    updated_by: Optional[str] = None


class CaseStudyResponse(BaseModel):
    id: uuid.UUID
    title: str
    slug: str
    subtitle: Optional[str] = None
    company_name: str
    company_logo: Optional[str] = None
    industry: Optional[str] = None
    featured_image: Optional[str] = None
    author: Optional[str] = None
    content: Optional[str] = None
    
    problem: Optional[Any] = None
    solution: Optional[Any] = None
    results: Optional[Any] = None
    metrics: Optional[Any] = None
    testimonial: Optional[Any] = None
    
    published: bool
    is_featured: bool
    tag_type: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    created_by: Optional[str] = None
    updated_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ─── MeetingRequest Schemas ───────────────────────────────────────────────────

class MeetingRequestCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    organization: str
    purpose: str


class MeetingRequestResponse(BaseModel):
    id: uuid.UUID
    name: str
    email: str
    phone: Optional[str] = None
    organization: str
    purpose: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
