import datetime
from typing import Optional, Any
from beanie import Document
from pydantic import BaseModel, EmailStr, Field


class Project(Document):
    id: Optional[str] = Field(...)
    title: str = Field(...)
    description: Optional[str] = Field(...)
    category: Optional[str] = Field(...)
    priority: Optional[str] = Field(...)
    createdByUserId: str = Field(...)
    tasks: Optional[list] = Field(...)
    events: Optional[list] = Field(...)
    isCompleted: bool = Field(...)
    taskCreationTime: datetime.datetime = Field(...)
    stage: Optional[str] = Field(...)
    workItems: Optional[dict] = Field(...)
    dueDate: Optional[datetime.datetime] = Field(...)
    
    class Settings:
        name = "Project"

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": "submit report",
                "description": "make sure report is already submitted",
                "category": "work",
                "priority": "High priority",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "tasks": [],
                "events": [],
                "isCompleted": "false",
                "taskCreationTime": "2022-12-16T16:09:23.443Z",
                "stage": "planning",
                "workItems": {},
                "dueDate": "2022-12-16T16:09:23.443Z",
            }
        }


class UpdateProjectModel(BaseModel):
    id: Optional[str]
    title: Optional[str]
    description: Optional[str]
    category: Optional[str]
    priority: Optional[str]
    createdByUserId: Optional[str]
    tasks: Optional[list]
    events: Optional[list]
    isCompleted: Optional[bool]
    taskCreationTime: Optional[datetime.datetime]
    stage: Optional[str]
    workItems: Optional[dict]
    dueDate: Optional[datetime.datetime]

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": "submit report",
                "description": "make sure report is already submitted",
                "category": "work",
                "priority": "High priority",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "tasks": [],
                "events": [],
                "isCompleted": "false",
                "taskCreationTime": "2022-12-16T16:09:23.443Z",
                "stage": "planning",
                "workItems": {},
                "dueDate": "2022-12-16T16:09:23.443Z",
            }
        }

