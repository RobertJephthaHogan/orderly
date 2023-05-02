from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.Checklist import Checklist, UpdateChecklistModel



checklist_collection = Checklist

class ChecklistOperations:

    async def add_checklist(new_checklist: Checklist) -> Checklist:
        new_checklist.id = str(ObjectId())
        checklist = await new_checklist.create()
        return checklist


    async def retrieve_all_checklists() -> List[Checklist]:
        checklists = await checklist_collection.all().to_list()
        return checklists

    
    async def retrieve_checklists_for_user(user_id) -> List[Checklist]:
        print('user_id', user_id)
        checklists = await checklist_collection.find(Checklist.createdByUserId == user_id).to_list()
        return checklists


    async def retrieve_checklist(id: Checklist) -> Checklist:
        checklist = await checklist_collection.get(str(id))
        if checklist:
            return checklist
        

    async def delete_checklist(id: PydanticObjectId) -> bool:
        try:
            checklist = await checklist_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if checklist:
            await checklist.delete()
            return True


    async def update_checklist_data(id: PydanticObjectId, data: dict) -> Union[bool, Checklist]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        checklist = await checklist_collection.get(str(id))
        if checklist:
            await checklist.update(update_query)
            return checklist
        return False

