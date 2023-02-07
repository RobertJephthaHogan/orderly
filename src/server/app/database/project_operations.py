from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.Project import Project, UpdateProjectModel



project_collection = Project

class ProjectOperations:

    async def add_project(new_project: Project) -> Project:
        new_project.id = str(ObjectId())
        project = await new_project.create()
        return project


    async def retrieve_all_projects() -> List[Project]:
        projects = await project_collection.all().to_list()
        return projects

    
    async def retreive_projects_for_user(user_id) -> List[Project]:
        print('user_id', user_id)
        projects = await project_collection.find(Project.createdByUserId == user_id).to_list()
        return projects


    async def retrieve_project(id: Project) -> Project:
        project = await project_collection.get(str(id))
        if project:
            return project
        

    async def delete_project(id: PydanticObjectId) -> bool:
        try:
            project = await project_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if project:
            await project.delete()
            return True


    async def update_project_data(id: PydanticObjectId, data: dict) -> Union[bool, Project]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        project = await project_collection.get(str(id))
        if project:
            await project.update(update_query)
            return project
        return False

