from apps.shared.utils import json_serializer


def custom_response(data: dict, message: str, status_code: int, error: str = None, total: int = None):
    """
    Standardize the API response format.
    """
    response = {
        "message": message,
        "data": json_serializer(data),
        "error": error,
        "status_code": status_code,
    }
    if total is not None:
        response["total"] = total
    return response
