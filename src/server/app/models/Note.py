import datetime
from typing import Optional, Any
from beanie import Document
from pydantic import BaseModel, EmailStr, Field


class Note(Document):
    id: Optional[str] = Field(...)
    title: str = Field(...)
    category: str = Field(...)
    body: str = Field(...)
    parent: str = Field(...)
    createdByUserId: str = Field(...)
    noteCreationTime: datetime.datetime = Field(...)
    dailyNoteForDate: Optional[datetime.datetime] = Field(...)
    
    class Settings:
        name = "Note"

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": "a note",
                "category": "general",
                "body": "this is a note",
                "parent": "6382e2abc07256ef099af571",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "noteCreationTime": "2022-12-22T16:09:23.443Z",
                "dailyNoteForDate": "2022-12-22T16:09:23.443Z",
            }
        }


class UpdateNoteModel(BaseModel):
    id: Optional[str]
    title: Optional[str]
    category: Optional[str]
    body: Optional[str]
    parent: Optional[str]
    createdByUserId: Optional[str]
    noteCreationTime: Optional[datetime.datetime]
    dailyNoteForDate: Optional[datetime.datetime] 

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": "a note",
                "category": "general",
                "body": "this is a note",
                "parent": "6382e2abc07256ef099af571",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "noteCreationTime": "2022-12-22T16:09:23.443Z",
                "dailyNoteForDate": "2022-12-22T16:09:23.443Z",
            }
        }

