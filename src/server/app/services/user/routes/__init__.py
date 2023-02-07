from fastapi import Body, APIRouter, HTTPException
from passlib.context import CryptContext
from beanie import PydanticObjectId

from ..jwt_handler import sign_jwt
from app.database import DatabaseOperations
from app.models.User import UpdateUserModel, User, UserData, UserSignIn, Response

from app.database import *


router = APIRouter()

hash_helper = CryptContext(schemes=["bcrypt"])

@router.post("/login")
async def user_login(user_credentials: UserSignIn = Body(...)):
    user_exists = await User.find_one(User.email == user_credentials.username)
    if user_exists:
        password = hash_helper.verify(
            user_credentials.password, user_exists.password)
        if password:
            jwt_resp = sign_jwt(user_credentials.username)
            resp_dto = {
                "data" : user_exists,
                "access_token" : list(jwt_resp.values())[0],
            }
            return resp_dto
        raise HTTPException(
            status_code=403,
            detail="Incorrect email or password"
        )

    raise HTTPException(
        status_code=403,
        detail="Incorrect email or password"
    )


@router.post("/new", response_model=UserData)
async def user_signup(user: User = Body(...)):
    user_exists = await User.find_one(User.email == user.email)
    if user_exists:
        raise HTTPException(
            status_code=409,
            detail="User with email supplied already exists"
        )
    user.password = hash_helper.encrypt(user.password)
    new_user = await DatabaseOperations.UserOperations.add_user(user)
    return new_user


@router.get("/{id}", response_description="User data retrieved", response_model=Response)
async def get_user(id: PydanticObjectId):
    user = await DatabaseOperations.UserOperations.retrieve_user(id)
    if user:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "User data retrieved successfully",
            "data": user
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "User doesn't exist",
    }


@router.put("/{id}", response_model=Response)
async def update_user(id: PydanticObjectId, updated_user: UpdateUserModel = Body(...)):
    updated_user = await DatabaseOperations.UserOperations.update_user(id, updated_user)
    if updated_user:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "User with ID: {} updated".format(id),
            "data": updated_user
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. User with ID: {} not found".format(id),
        "data": False
    }


@router.delete("/{id}", response_description="User data deleted")
async def get_user(id: PydanticObjectId):
    user = await DatabaseOperations.UserOperations.delete_user(id)
    if user:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "User data deleted successfully",
            "data": user
        }
    else :
        return {
        "status_code": 500,
        "response_type": "error",
        "description": "Error deleting user",
    }
