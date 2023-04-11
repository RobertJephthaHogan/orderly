import datetime
from typing import Optional, Any
from beanie import Document
from pydantic import BaseModel, EmailStr, Field


class Checklist(Document):
    id: Optional[str] = Field(...)
    title: str = Field(...)
    category: str = Field(...)
    parent: str = Field(...)
    items: list = Field(...)
    createdByUserId: str = Field(...)
    checklistCreationTime: datetime.datetime = Field(...)
    
    class Settings:
        name = "Checklist"

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": "a note",
                "category": "general",
                "parent": "6382e2abc07256ef099af571",
                "items": [],
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "checklistCreationTime": "2022-12-22T16:09:23.443Z",
            }
        }


class UpdateChecklistModel(BaseModel):
    id: Optional[str]
    title: Optional[str]
    category: Optional[str]
    parent: Optional[str]
    items: Optional[list]
    createdByUserId: Optional[str]
    checklistCreationTime: Optional[datetime.datetime]

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": "a note",
                "category": "general",
                "parent": "6382e2abc07256ef099af571",
                "items": [],
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "checklistCreationTime": "2022-12-22T16:09:23.443Z",
            }
        }

