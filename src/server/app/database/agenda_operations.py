from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.Agenda import Agenda, UpdateAgendaModel



agenda_collection = Agenda

class AgendaOperations:

    async def add_agenda(new_agenda: Agenda) -> Agenda:
        new_agenda.id = str(ObjectId())
        agenda = await new_agenda.create()
        return agenda


    async def retrieve_all_agendas() -> List[Agenda]:
        agendas = await agenda_collection.all().to_list()
        return agendas

    
    async def retrieve_agendas_for_user(user_id) -> List[Agenda]:
        print('user_id', user_id)
        agendas = await agenda_collection.find(Agenda.createdByUserId == user_id).to_list()
        return agendas


    async def retrieve_agenda(id: Agenda) -> Agenda:
        agenda = await agenda_collection.get(str(id))
        if agenda:
            return agenda
        

    async def delete_agenda(id: PydanticObjectId) -> bool:
        try:
            agenda = await agenda_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if agenda:
            await agenda.delete()
            return True


    async def update_agenda_data(id: PydanticObjectId, data: dict) -> Union[bool, Agenda]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        agenda = await agenda_collection.get(str(id))
        if agenda:
            await agenda.update(update_query)
            return agenda
        return False

