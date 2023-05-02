from typing import Optional
import os
from dotenv import load_dotenv
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseSettings

from app.models.User import User
from app.models.Event import Event
from app.models.Task import Task
from app.models.Project import Project
from app.models.Note import Note
from app.models.Agenda import Agenda
from app.models.Checklist import Checklist


# Load the environment variables
load_dotenv()

class Settings(BaseSettings):
    # database configurations
    DATABASE_URL: Optional[str] = os.getenv("MONGO_DETAILS")

    # JWT
    secret_key: str
    algorithm: str = "HS256"

    # On Start-up Configuration 
    should_run_startup_tests = 0

    # Decorator Variable Configuration
    should_time_function = 1
    should_log_to_txt = 1

    # Config Class
    class Config:
        env_file = ".env"
        orm_mode = True


async def initiate_database():
    client = AsyncIOMotorClient(Settings().DATABASE_URL)
    await init_beanie(database=client.orderly,
                        document_models=[ 
                            User, 
                            Task, 
                            Event, 
                            Project, 
                            Note,
                            Agenda,
                            Checklist
                        ])
