from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .services.user.routes import router as UserRouter
from .services.task.routes import router as TaskRouter
from .services.event.routes import router as EventRouter
from .services.project.routes import router as ProjectRouter
from .services.note.routes import router as NoteRouter
from .services.agenda.routes import router as AgendaRouter

from .config import initiate_database

app = FastAPI()

origins = [ 
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://orderly.roberthogan.io',
        'orderly.roberthogan.io',
        ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials= True,
    allow_methods=['*'],
    allow_headers=['*'],
)


# Start Up Events
@app.on_event("startup")
async def startup_event():
    await initiate_database()
    print("Starting Server...")


# Root Render
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Hello Orderly."}


app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(TaskRouter, tags=["Task"], prefix="/task")
app.include_router(EventRouter, tags=["Event"], prefix="/event")
app.include_router(ProjectRouter, tags=["Project"], prefix="/project")
app.include_router(NoteRouter, tags=["Note"], prefix="/note")
app.include_router(AgendaRouter, tags=["Agenda"], prefix="/agenda")
