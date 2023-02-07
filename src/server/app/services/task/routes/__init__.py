import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.task_operations import TaskOperations
from app.models.Task import Task, UpdateTaskModel
from app.models.Response import Response200, Response404


router = APIRouter()

@router.get("/single/{id}", response_description="Task data retrieved", response_model=Response)
async def get_task_data(id: PydanticObjectId):
    task = await TaskOperations.retrieve_task(id)
    if task:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Task data retrieved successfully",
            "data": task
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Task doesn't exist",
    }

@router.get("/user/{user_id}", response_description="Task data retrieved", response_model=Response)
async def get_tasks_for_user(user_id):
    tasks = await TaskOperations.retrieve_tasks_for_user(user_id)
    schData = Task.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : tasks,
        "schema": schData
    }
    if tasks:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())

@router.get("/get_all_tasks", response_description="Task data retrieved", response_model=Response)
async def get_tasks():
    tasks = await TaskOperations.retrieve_all_tasks()
    if tasks:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Tasks retrieved successfully",
            "data": tasks
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No Tasks exist",
    }


@router.post("/create_task", response_description="Task data added into the database", response_model=Response)
async def add_task_data(task: Task = Body(...)):
    new_task = await TaskOperations.add_task(task)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Task created successfully",
        "data": new_task
    }


@router.delete("/{id}", response_description="Task data deleted from the database")
async def delete_task_data(id: PydanticObjectId):
    deleted_task = await TaskOperations.delete_task(id)
    if deleted_task:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Task with ID: {} removed".format(id),
            "data": deleted_task
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Task with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_task(id: PydanticObjectId, req: UpdateTaskModel = Body(...)):
    updated_task = await TaskOperations.update_task_data(id, req.dict())
    if updated_task:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Task with ID: {} updated".format(id),
            "data": updated_task
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Task with ID: {} not found".format(id),
        "data": False
    }
