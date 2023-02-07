from pydantic import BaseModel, validator
from typing import Any, Optional


class Response(BaseModel):
    status_code: int
    response_type: str
    description: str
    data: Optional[Any]

    class Config:
        schema_extra = {
            "example": {
                "status_code": 200,
                "response_type": "success",
                "description": "Operation successful",
                "data": "Sample data"
            }
        }


class Response200(BaseModel):
    status_code: int = 200
    response_type: str = "Success"
    description: str = "Operation Success"
    data: Optional[Any]

    class Config:
        schema_extra = {
            "example": {
                "status_code": 200,
                "response_type": "success",
                "description": "Operation successful",
                "data": "data"
            }
        }


class Response404(BaseModel):
    status_code: int = 404
    response_type: str = "Error"
    description: str = "Operation Failed"
    data: Optional[Any]

    class Config:
        schema_extra = {
            "example": {
                "status_code": 404,
                "response_type": "Error",
                "description": "Operation Failed",
                "data": "data"
            }
        }
