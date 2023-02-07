from beanie import PydanticObjectId
from typing import List, Union
from app.models.User import User, UserData, UserSignIn, UpdateUserModel
from app.models import Response
from bson import ObjectId



user_collection = User

class UserOperations:


    async def add_user(new_user: User) -> User:
        new_user.id = str(ObjectId())
        user = await new_user.create()
        return user


    async def retrieve_user(user: User) -> User:
        user = await user_collection.get(str(user))
        if user:
            return user


    async def update_user(id: PydanticObjectId, data: dict) -> Union[bool, User]:
        des_body = {k: v for k, v in dict(data).items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        user = await user_collection.get(str(id))
        if user:
            await user.update(update_query)
            return user
        return False


    async def delete_user(user_id_to_delete : PydanticObjectId) -> User:
        user = await user_collection.get(str(user_id_to_delete))
        if user:
            await user.delete()
            return True
        return False

