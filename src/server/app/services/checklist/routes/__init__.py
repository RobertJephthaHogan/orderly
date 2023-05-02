import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.checklist_operations import ChecklistOperations
from app.models.Checklist import Checklist, UpdateChecklistModel
from app.models.Response import Response200, Response404


router = APIRouter()

@router.get("/single/{id}", response_description="Checklist data retrieved", response_model=Response)
async def get_checklist_data(id: PydanticObjectId):
    checklist = await ChecklistOperations.retrieve_checklist(id)
    if checklist:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Checklist data retrieved successfully",
            "data": checklist
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Checklist doesn't exist",
    }

@router.get("/user/{user_id}", response_description="Checklist data retrieved", response_model=Response)
async def get_checklists_for_user(user_id):
    checklists = await ChecklistOperations.retrieve_checklists_for_user(user_id)
    schData = Checklist.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : checklists,
        "schema": schData
    }
    if checklists:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())

@router.get("/get_all_checklists", response_description="Checklist data retrieved", response_model=Response)
async def get_checklists():
    checklists = await ChecklistOperations.retrieve_all_checklists()
    if checklists:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Checklists retrieved successfully",
            "data": checklists
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No Checklists exist",
    }


@router.post("/create_checklist", response_description="Checklist data added into the database", response_model=Response)
async def add_checklist_data(checklist: Checklist = Body(...)):
    new_checklist = await ChecklistOperations.add_checklist(checklist)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Checklist created successfully",
        "data": new_checklist
    }


@router.delete("/{id}", response_description="Checklist data deleted from the database")
async def delete_checklist_data(id: PydanticObjectId):
    deleted_checklist = await ChecklistOperations.delete_checklist(id)
    if deleted_checklist:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Checklist with ID: {} removed".format(id),
            "data": deleted_checklist
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Checklist with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_checklist(id: PydanticObjectId, req: UpdateChecklistModel = Body(...)):
    updated_checklist = await ChecklistOperations.update_checklist_data(id, req.dict())
    if updated_checklist:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Checklist with ID: {} updated".format(id),
            "data": updated_checklist
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Checklist with ID: {} not found".format(id),
        "data": False
    }
