import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.intake_operations import IntakeOperations
from app.models.Intake import Intake, UpdateIntakeModel
from app.models.Response import Response200, Response404


router = APIRouter()

@router.get("/single/{id}", response_description="Intake data retrieved", response_model=Response)
async def get_intake_data(id: PydanticObjectId):
    intake = await IntakeOperations.retrieve_intake(id)
    if intake:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Intake data retrieved successfully",
            "data": intake
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Intake doesn't exist",
    }

@router.get("/user/{user_id}", response_description="Intake data retrieved", response_model=Response)
async def get_intakes_for_user(user_id):
    intakes = await IntakeOperations.retrieve_intakes_for_user(user_id)
    schData = Intake.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : intakes,
        "schema": schData
    }
    if intakes:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())

@router.get("/get_all_intakes", response_description="Intake data retrieved", response_model=Response)
async def get_intakes():
    intakes = await IntakeOperations.retrieve_all_intakes()
    if intakes:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Intakes retrieved successfully",
            "data": intakes
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No Intakes exist",
    }


@router.post("/new", response_description="Intake data added into the database", response_model=Response)
async def add_intake_data(intake: Intake = Body(...)):
    new_intake = await IntakeOperations.add_intake(intake)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Intake created successfully",
        "data": new_intake
    }


@router.delete("/{id}", response_description="Intake data deleted from the database")
async def delete_intake_data(id: PydanticObjectId):
    deleted_intake = await IntakeOperations.delete_intake(id)
    if deleted_intake:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Intake with ID: {} removed".format(id),
            "data": deleted_intake
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Intake with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_intake(id: PydanticObjectId, req: UpdateIntakeModel = Body(...)):
    updated_intake = await IntakeOperations.update_intake_data(id, req.dict())
    if updated_intake:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Intake with ID: {} updated".format(id),
            "data": updated_intake
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Intake with ID: {} not found".format(id),
        "data": False
    }
