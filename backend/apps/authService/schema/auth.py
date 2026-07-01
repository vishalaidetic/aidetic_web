from pydantic import BaseModel, EmailStr, ConfigDict, Field
from uuid import UUID
from datetime import datetime
from typing import List, Optional


# ==================== Permission & Role Schemas ====================
class PermissionBase(BaseModel):
    name: str
    code: str

class PermissionCreate(PermissionBase):
    pass

class PermissionGet(PermissionBase):
    id: UUID
    model_config = ConfigDict(from_attributes=True)

class PermissionDelete(BaseModel):
    id: UUID

class RoleBase(BaseModel):
    name: str
    description: Optional[str] = None

class RoleCreate(RoleBase):
    pass

class RoleGet(RoleBase):
    id: UUID
    permissions: List[PermissionGet] = []
    model_config = ConfigDict(from_attributes=True)

class RoleUpdate(RoleBase):
    pass

class RoleDelete(BaseModel):
    id: UUID


# ==================== User Schemas ====================
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6, max_length=100)

class UserLogin(BaseModel):
    """Accepts email + password for login."""
    email: EmailStr
    password: str
    # Also accept username field for backward-compat with existing callers
    username: Optional[str] = None

class UserGet(BaseModel):
    id: UUID
    username: str
    email: str
    status: str
    is_superuser: bool
    created_at: datetime
    roles: List[RoleGet] = []
    model_config = ConfigDict(from_attributes=True)

class UserUpdate(BaseModel):
    status: Optional[str] = None
    is_superuser: Optional[bool] = None
    roles: Optional[List[UUID]] = None
    model_config = ConfigDict(from_attributes=True)

class UserDelete(BaseModel):
    id: UUID


# ==================== Session & Token Schemas ====================
class LoginResponse(BaseModel):
    """Lightweight login response — no nested role/permission graph."""
    session_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    username: str
    expires_at: datetime

# Keep TokenResponse for backward compat with other parts of the codebase
class TokenResponse(BaseModel):
    session_token: str
    token_type: str = "bearer"
    user: UserGet
    expires_at: datetime

class SessionResponse(BaseModel):
    id: UUID
    session_token: str
    expires_at: datetime
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
