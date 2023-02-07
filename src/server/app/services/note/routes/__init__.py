import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.note_operations import NoteOperations
from app.models.Note import Note, UpdateNoteModel
from app.models.Response import Response200, Response404


router = APIRouter()

@router.get("/single/{id}", response_description="Note data retrieved", response_model=Response)
async def get_note_data(id: PydanticObjectId):
    note = await NoteOperations.retrieve_note(id)
    if note:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Note data retrieved successfully",
            "data": note
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Note doesn't exist",
    }

@router.get("/user/{user_id}", response_description="Note data retrieved", response_model=Response)
async def get_notes_for_user(user_id):
    notes = await NoteOperations.retreive_notes_for_user(user_id)
    schData = Note.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : notes,
        "schema": schData
    }
    if notes:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())

@router.get("/get_all_notes", response_description="Note data retrieved", response_model=Response)
async def get_notes():
    notes = await NoteOperations.retrieve_all_notes()
    if notes:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "notes retrieved successfully",
            "data": notes
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No notes exist",
    }


@router.post("/create_note", response_description="Note data added into the database", response_model=Response)
async def add_note_data(note: Note = Body(...)):
    new_note = await NoteOperations.add_note(note)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Note created successfully",
        "data": new_note
    }


@router.delete("/{id}", response_description="Note data deleted from the database")
async def delete_note_data(id: PydanticObjectId):
    deleted_note = await NoteOperations.delete_note(id)
    if deleted_note:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Note with ID: {} removed".format(id),
            "data": deleted_note
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Note with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_note(id: PydanticObjectId, req: UpdateNoteModel = Body(...)):
    updated_note = await NoteOperations.update_note_data(id, req.dict())
    if updated_note:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Note with ID: {} updated".format(id),
            "data": updated_note
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Note with ID: {} not found".format(id),
        "data": False
    }
