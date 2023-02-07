from typing import List, Union
from app.models.Event import Event, UpdateEventModel
from beanie import PydanticObjectId
from pydantic import ValidationError
from bson import ObjectId


calendar_collection = Event

class EventOperations:

    async def add_calendar_event(new_event: Event) -> Event:
        new_event.id = str(ObjectId())
        event = await new_event.create()
        return event


    async def retrieve_calendar_events() -> List[Event]:
        calendar_events = await calendar_collection.all().to_list()
        return calendar_events

    async def retrieve_events_for_user(user_id) -> List[Event]:
        print('user_id', user_id)
        calendar_events = await calendar_collection.find(Event.createdByUserId == user_id).to_list()
        return calendar_events


    async def retrieve_calendar_event(id: PydanticObjectId) -> Event:
        calendar_event = await calendar_collection.get(str(id))
        if calendar_event:
            return calendar_event
        

    async def delete_calendar_event(id: PydanticObjectId) -> bool:
        try:
            calendar_event = await calendar_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if calendar_event:
            await calendar_event.delete()
            return True


    async def update_calendar_event_data(id: PydanticObjectId, data: dict) -> Union[bool, Event]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        calendar_event = await calendar_collection.get(str(id))
        if calendar_event:
            await calendar_event.update(update_query)
            return calendar_event
        return False

