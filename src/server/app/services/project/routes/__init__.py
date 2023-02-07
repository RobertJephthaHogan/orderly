from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.project_operations import ProjectOperations
from app.models.Project import Project, UpdateProjectModel


router = APIRouter()

@router.get("/single/{id}", response_description="Project data retrieved", response_model=Response)
async def get_project_data(id: PydanticObjectId):
    print('router id', id)
    project = await ProjectOperations.retrieve_project(id)
    if project:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Project data retrieved successfully",
            "data": project
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Project doesn't exist",
    }

@router.get("/user/{user_id}", response_description="Project data retrieved", response_model=Response)
async def get_projects_for_user(user_id):
    projects = await ProjectOperations.retreive_projects_for_user(user_id)
    schData = Project.schema()
    if hasattr(schData['properties'], 'revision_id'):
        del schData['properties']['revision_id']
    dto = {
        "queryResult" : projects,
        "schema": schData
    }
    if projects:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Project data retrieved successfully",
            "data": dto
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Project doesn't exist",
    }

@router.get("/get_all_projects", response_description="Project data retrieved", response_model=Response)
async def get_projects():
    projects = await ProjectOperations.retrieve_all_projects()
    if projects:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Projects retrieved successfully",
            "data": projects
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No Projects exist",
    }


@router.post("/create_project", response_description="Project data added into the database", response_model=Response)
async def add_project_data(project: Project = Body(...)):
    new_project = await ProjectOperations.add_project(project)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Project created successfully",
        "data": new_project
    }


@router.delete("/{id}", response_description="Project data deleted from the database")
async def delete_project_data(id: PydanticObjectId):
    deleted_project = await ProjectOperations.delete_project(id)
    if deleted_project:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Project with ID: {} removed".format(id),
            "data": deleted_project
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Project with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_project(id: PydanticObjectId, req: UpdateProjectModel = Body(...)):
    updated_project = await ProjectOperations.update_project_data(id, req.dict())
    if updated_project:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Project with ID: {} updated".format(id),
            "data": updated_project
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Project with ID: {} not found".format(id),
        "data": False
    }
