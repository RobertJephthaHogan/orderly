import datetime
from typing import Optional, Any
from beanie import Document
from pydantic import BaseModel, Field


class Event(Document):
    id: Optional[str] = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    parent: Optional[str] = Field(...)
    category: str = Field(...)
    createdByUserId: str = Field(...)
    startTime: datetime.datetime = Field(...)    
    endTime: datetime.datetime = Field(...)    

    class Settings:
        name = "Event"
    
    class Config:
        schema_extra = {
            "example": {
                "id": "wwv45yw4gw45w76nr657eu",
                "title": "submit report",
                "description": "make sure report is already submitted",
                "parent": "wwv45yw4gw45w76nr657ed",
                "category": "High priority",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "startTime": "1652073780000",
                "endTime": "1652073780000",
            }
        }


class UpdateEventModel(BaseModel):
    id: Optional[str]
    title: Optional[str]
    description: Optional[str]
    parent: Optional[str]
    category: Optional[str]
    createdByUserId: str = Field(...)
    startTime: Optional[datetime.datetime]
    endTime: Optional[datetime.datetime]

    class Settings:
        name = "Event"

    class Config:
        schema_extra = {
            "example": {
                "id": "wwv45yw4gw45w76nr657eu",
                "title": "submit report",
                "description": "make sure report is already submitted",
                "parent": "wwv45yw4gw45w76nr657ed",
                "category": "High priority",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "startTime": "1652073780000",
                "endTime": "1652073780000",
            }
        }


