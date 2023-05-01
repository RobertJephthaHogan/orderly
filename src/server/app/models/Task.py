import datetime
from typing import Optional, Any, Union
from beanie import Document
from pydantic import BaseModel, EmailStr, Field


class Task(Document):
    id: Optional[str] = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    parent: str = Field(...)
    category: str = Field(...)
    priority: str = Field(...)
    createdByUserId: str = Field(...)
    isCompleted: bool = Field(...)
    taskCreationTime: datetime.datetime = Field(...)
    dueDate: Union[datetime.datetime, None] = Field(...)
    
    class Settings:
        name = "Task"

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": "submit report",
                "description": "make sure report is already submitted",
                "parent": "6382e2abc07256ef099af571",
                "category": "work",
                "priority": "High priority",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "isCompleted": "false",
                "taskCreationTime": "1652073780000",
                "dueDate": "1652073780000",
            }
        }


class UpdateTaskModel(BaseModel):
    id: Optional[str]
    title: Optional[str]
    description: Optional[str]
    parent: Optional[str]
    category: Optional[str]
    priority: Optional[str]
    createdByUserId: Optional[str]
    isCompleted: Optional[bool]
    taskCreationTime: Optional[datetime.datetime]
    dueDate: Optional[datetime.datetime]

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": "the_title",
                "description": "the replacement description",
                "parent": "6382e2abc07256ef099af571",
                "category": "work",
                "priority": "High priority",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "isCompleted": "false",
                "taskCreationTime": "1652073780000",
                "dueDate": "1652073780000",
            }
        }

