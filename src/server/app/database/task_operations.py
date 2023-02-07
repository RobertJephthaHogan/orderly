from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.Task import Task, UpdateTaskModel



task_collection = Task

class TaskOperations:

    async def add_task(new_task: Task) -> Task:
        new_task.id = str(ObjectId())
        task = await new_task.create()
        return task


    async def retrieve_all_tasks() -> List[Task]:
        tasks = await task_collection.all().to_list()
        return tasks

    
    async def retrieve_tasks_for_user(user_id) -> List[Task]:
        print('user_id', user_id)
        tasks = await task_collection.find(Task.createdByUserId == user_id).to_list()
        return tasks


    async def retrieve_task(id: Task) -> Task:
        task = await task_collection.get(str(id))
        if task:
            return task
        

    async def delete_task(id: PydanticObjectId) -> bool:
        try:
            task = await task_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if task:
            await task.delete()
            return True


    async def update_task_data(id: PydanticObjectId, data: dict) -> Union[bool, Task]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        task = await task_collection.get(str(id))
        if task:
            await task.update(update_query)
            return task
        return False

