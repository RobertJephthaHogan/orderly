from typing import Any, Optional
from beanie import Document
from fastapi.security import HTTPBasicCredentials
from pydantic import BaseModel, EmailStr, Field


class User(Document):
    id: Optional[str] = Field(...)
    firstName: str = Field(...)
    lastName: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    phoneNumber: str = Field(...)
    todos: list = Field(...)
    events: list = Field(...)
    accountsInfo: list = Field(...)
    role: str = Field(...)

    class Settings:
        name = "users"

    class Config:
        schema_extra = {
            "example": {
                "id": "6276c8a63de1b5229336df5c",
                "firstName": "John",
                "lastName": "Doe",
                "email": "user@user.dev",
                "password": "password",
                "phoneNumber": "345-555-5555#",
                "todos": ["one", "two"],
                "events": ["one", "two"],
                "accountsInfo": ["one", "two"],
                "role": "user"
            }
        }


class UserSignIn(HTTPBasicCredentials):
    class Config:
        schema_extra = {
            "example": {
                "username": "user@user.dev",
                "password": "password"
            }
        }


class UserData(BaseModel):
    id: Optional[str]
    firstName: str = Field(...)
    lastName: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    phoneNumber: str = Field(...)
    todos: list = Field(...)
    events: list = Field(...)
    accountsInfo: list = Field(...)
    role: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "id": "6276c8a63de1b5229336df5c",
                "firstName": "John",
                "lastName": "Doe",
                "email": "user@user.dev",
                "password": "password",
                "phoneNumber": "345-555-5555#",
                "todos": ["one", "two"],
                "events": ["one", "two"],
                "accountsInfo": ["one", "two"],
                "role": "user"
            }
        }


class UpdateUserModel(BaseModel):
    id: Optional[str]
    firstName: Optional[str]
    lastName: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]
    phoneNumber: Optional[str]
    todos: Optional[list]
    events: Optional[list]
    accountsInfo: Optional[list]
    role: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "id": "6276c8a63de1b5229336df5c",
                "firstName": "John",
                "lastName": "Doe",
                "email": "user@user.dev",
                "password": "password",
                "phoneNumber": "345-555-5555#",
                "todos": ["one", "two"],
                "events": ["one", "two"],
                "accountsInfo": ["one", "two"],
                "role": "user"
            }
        }

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
