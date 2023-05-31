import datetime
from typing import Optional, Any
from beanie import Document
from pydantic import BaseModel, EmailStr, Field


class Intake(Document):
    id: Optional[str] = Field(...)
    title: Optional[str] = Field(...)
    ingredients: Optional[list] = Field(...)
    createdByUserId: str = Field(...)
    time: datetime.datetime = Field(...)
    hasBeenConsumed: Optional[bool] = Field(...)
    
    
    class Settings:
        name = "Intake"

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": 'Breakfast',
                "ingredients": [],
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "time": "2022-12-22T16:09:23.443Z",
                "hasBeenConsumed": False
            }
        }


class UpdateIntakeModel(BaseModel):
    id: Optional[str]
    title: Optional[str] 
    ingredients: Optional[list]
    createdByUserId: Optional[str]
    time: Optional[datetime.datetime]
    hasBeenConsumed: Optional[bool]

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": 'Breakfast',
                "ingredients": [],
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "time": "2022-12-22T16:09:23.443Z",
                "hasBeenConsumed": True
            }
        }

