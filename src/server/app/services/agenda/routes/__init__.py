import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.agenda_operations import AgendaOperations
from app.models.Agenda import Agenda, UpdateAgendaModel
from app.models.Response import Response200, Response404


router = APIRouter()

@router.get("/single/{id}", response_description="Agenda data retrieved", response_model=Response)
async def get_agenda_data(id: PydanticObjectId):
    agenda = await AgendaOperations.retrieve_agenda(id)
    if agenda:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Agenda data retrieved successfully",
            "data": agenda
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Agenda doesn't exist",
    }

@router.get("/user/{user_id}", response_description="Agenda data retrieved", response_model=Response)
async def get_agendas_for_user(user_id):
    agendas = await AgendaOperations.retrieve_agendas_for_user(user_id)
    schData = Agenda.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : agendas,
        "schema": schData
    }
    if agendas:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())

@router.get("/get_all_agendas", response_description="Agenda data retrieved", response_model=Response)
async def get_agendas():
    agendas = await AgendaOperations.retrieve_all_agendas()
    if agendas:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Agendas retrieved successfully",
            "data": agendas
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No Agendas exist",
    }


@router.post("/create_agenda", response_description="Agenda data added into the database", response_model=Response)
async def add_agenda_data(agenda: Agenda = Body(...)):
    new_agenda = await AgendaOperations.add_agenda(agenda)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Agenda created successfully",
        "data": new_agenda
    }


@router.delete("/{id}", response_description="Agenda data deleted from the database")
async def delete_agenda_data(id: PydanticObjectId):
    deleted_agenda = await AgendaOperations.delete_agenda(id)
    if deleted_agenda:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Agenda with ID: {} removed".format(id),
            "data": deleted_agenda
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Agenda with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_agenda(id: PydanticObjectId, req: UpdateAgendaModel = Body(...)):
    updated_agenda = await AgendaOperations.update_agenda_data(id, req.dict())
    if updated_agenda:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Agenda with ID: {} updated".format(id),
            "data": updated_agenda
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Agenda with ID: {} not found".format(id),
        "data": False
    }
