from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.Intake import Intake, UpdateIntakeModel



intake_collection = Intake

class IntakeOperations:

    async def add_intake(new_intake: Intake) -> Intake:
        new_intake.id = str(ObjectId())
        intake = await new_intake.create()
        return intake


    async def retrieve_all_intakes() -> List[Intake]:
        intakes = await intake_collection.all().to_list()
        return intakes

    
    async def retrieve_intakes_for_user(user_id) -> List[Intake]:
        print('user_id', user_id)
        intakes = await intake_collection.find(Intake.createdByUserId == user_id).to_list()
        return intakes


    async def retrieve_intake(id: Intake) -> Intake:
        intake = await intake_collection.get(str(id))
        if intake:
            return intake
        

    async def delete_intake(id: PydanticObjectId) -> bool:
        try:
            intake = await intake_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if intake:
            await intake.delete()
            return True


    async def update_intake_data(id: PydanticObjectId, data: dict) -> Union[bool, Intake]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        intake = await intake_collection.get(str(id))
        if intake:
            await intake.update(update_query)
            return intake
        return False

