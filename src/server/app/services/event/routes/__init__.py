import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.database.event_operations import EventOperations
from app.models.Event import Event, UpdateEventModel
from app.models.Response import Response
from app.models.Response import Response200, Response404

router = APIRouter()


@router.get("/single/{id}", response_description="Calendar Event data retrieved", response_model=Response)
async def get_calendar_event_data(id: PydanticObjectId):
    calendar_event = await EventOperations.retrieve_calendar_event(id)
    if calendar_event:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Calendar Event data retrieved successfully",
            "data": calendar_event
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Calendar Event doesn't exist",
    }


@router.get("/user/{user_id}", response_description="Calendar Event data retrieved", response_model=Response)
async def get_user_events(user_id):
    calendar_events = await EventOperations.retrieve_events_for_user(user_id)
    schData = Event.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : calendar_events,
        "schema": Event.schema()
    }
    if calendar_events:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())


@router.get("/get_all_events", response_description="Calendar Event data retrieved", response_model=Response)
async def get_calendar_event_data():
    calendar_event = await EventOperations.retrieve_calendar_events()
    if calendar_event:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Calendar Events retrieved successfully",
            "data": calendar_event
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No Calendar Events exist",
    }



@router.post("/create_calendar_event", response_description="Calendar Event data added into the database", response_model=Response)
async def add_calendar_event_data(calendar_event: Event = Body(...)):
    new_calendar_event = await EventOperations.add_calendar_event(calendar_event)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Calendar Event created successfully",
        "data": new_calendar_event
    }


@router.delete("/{id}", response_description="Calendar Event data deleted from the database")
async def delete_calendar_event_data(id: PydanticObjectId):
    deleted_calendar_event = await EventOperations.delete_calendar_event(id)
    if deleted_calendar_event:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Calendar Event with ID: {} removed".format(id),
            "data": deleted_calendar_event
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Calendar Event with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_calendar_event(id: PydanticObjectId, req: UpdateEventModel = Body(...)):
    updated_calendar_event = await EventOperations.update_calendar_event_data(id, req.dict())
    if updated_calendar_event:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Calendar Event with ID: {} updated".format(id),
            "data": updated_calendar_event
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Calendar Event with ID: {} not found".format(id),
        "data": False
    }
