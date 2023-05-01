import datetime
from typing import Optional, Any
from beanie import Document
from pydantic import BaseModel, EmailStr, Field


class Agenda(Document):
    id: Optional[str] = Field(...)
    createdByUserId: str = Field(...)
    agendaDate: datetime.datetime = Field(...)
    
    
    class Settings:
        name = "Agenda"

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "agendaDate": "2022-12-22T16:09:23.443Z",
            }
        }


class UpdateAgendaModel(BaseModel):
    id: Optional[str]
    createdByUserId: Optional[str]
    agendaDate: Optional[datetime.datetime]

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "agendaDate": "2022-12-22T16:09:23.443Z",
            }
        }

