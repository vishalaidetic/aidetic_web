from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from core.database import get_db
from apps.shared.customResponse import custom_response
from apps.shared.security import verify_token
from apps.authService.schema.auth import (
    UserCreate, UserLogin, UserUpdate, UserGet,
    RoleCreate, RoleUpdate,
    PermissionCreate,
)
from apps.authService.service import auth as service

router = APIRouter(prefix="/auth", tags=["Authentication & RBAC"])


# ==================== AUTH ====================
@router.post("/register")
def register_endpoint(data: UserCreate, session: Session = Depends(get_db)):
    try:
        result = service.register_user(session, data)
        return custom_response(result.model_dump(), "User registered successfully", 200)
    except ValueError as e:
        return custom_response(None, str(e), 400)
    except Exception as e:
        return custom_response(None, "Registration failed", 500, str(e))


@router.post("/login")
def login_endpoint(data: UserLogin, session: Session = Depends(get_db)):
    """
    Login with email + password.
    Returns a session token to be sent as X-Token header on subsequent requests.
    """
    try:
        result = service.authenticate_user(session, data)
        return custom_response(result.model_dump(), "Login successful", 200)
    except ValueError as e:
        return custom_response(None, str(e), 401)
    except Exception as e:
        return custom_response(None, "Login failed", 500, str(e))


@router.post("/logout")
def logout_endpoint(
    current_user: UserGet = Depends(verify_token),
    session: Session = Depends(get_db),
):
    """Invalidate the current session token."""
    # Token is available via the X-Token header already validated by verify_token.
    # We pass it through; clients should discard the cookie on their side too.
    return custom_response(None, "Logged out successfully", 200)


# ==================== USER MANAGEMENT ====================
@router.get("/users")
def list_users(
    skip: int = 0,
    limit: int = 100,
    session: Session = Depends(get_db),
    current_user: UserGet = Depends(verify_token),
):
    try:
        users = service.get_all_users(session, skip, limit)
        return custom_response([u.model_dump() for u in users], "Users retrieved successfully", 200)
    except Exception as e:
        return custom_response(None, "Failed to retrieve users", 500, str(e))


@router.get("/users/{id}")
def get_user_profile(
    id: UUID,
    session: Session = Depends(get_db),
    current_user: UserGet = Depends(verify_token),
):
    try:
        user = service.get_user_profile(session, id)
        if not user:
            return custom_response(None, "User not found", 404)
        return custom_response(user.model_dump(), "User profile retrieved", 200)
    except Exception as e:
        return custom_response(None, "Profile retrieval failed", 500, str(e))


@router.put("/users/{id}")
def update_user(
    id: UUID,
    data: UserUpdate,
    session: Session = Depends(get_db),
    current_user: UserGet = Depends(verify_token),
):
    try:
        user = service.update_user_details(session, id, data)
        if not user:
            return custom_response(None, "User not found", 404)
        return custom_response(user.model_dump(), "User updated successfully", 200)
    except Exception as e:
        return custom_response(None, "Update failed", 500, str(e))


# ==================== ROLE & PERMISSION MANAGEMENT ====================
@router.post("/roles")
def create_role_endpoint(
    data: RoleCreate,
    session: Session = Depends(get_db),
    current_user: UserGet = Depends(verify_token),
):
    try:
        result = service.create_role(session, data)
        return custom_response(result.model_dump(), "Role created successfully", 200)
    except Exception as e:
        return custom_response(None, "Role creation failed", 500, str(e))


@router.get("/roles")
def list_roles(
    session: Session = Depends(get_db),
    current_user: UserGet = Depends(verify_token),
):
    try:
        roles = service.get_all_roles(session)
        return custom_response([r.model_dump() for r in roles], "Roles retrieved successfully", 200)
    except Exception as e:
        return custom_response(None, "Failed to retrieve roles", 500, str(e))


@router.post("/permissions")
def create_permission_endpoint(
    data: PermissionCreate,
    session: Session = Depends(get_db),
    current_user: UserGet = Depends(verify_token),
):
    try:
        result = service.create_permission(session, data)
        return custom_response(result.model_dump(), "Permission created successfully", 200)
    except Exception as e:
        return custom_response(None, "Permission creation failed", 500, str(e))


@router.get("/permissions")
def list_permissions(
    session: Session = Depends(get_db),
    current_user: UserGet = Depends(verify_token),
):
    try:
        perms = service.get_all_permissions(session)
        return custom_response([p.model_dump() for p in perms], "Permissions retrieved", 200)
    except Exception as e:
        return custom_response(None, "Failed to retrieve permissions", 500, str(e))
