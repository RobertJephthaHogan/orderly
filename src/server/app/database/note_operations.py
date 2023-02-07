from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.Note import Note, UpdateNoteModel



notes_collection = Note

class NoteOperations:

    async def add_note(new_note: Note) -> Note:
        new_note.id = str(ObjectId())
        note = await new_note.create()
        return note


    async def retrieve_all_notes() -> List[Note]:
        notes = await notes_collection.all().to_list()
        return notes

    
    async def retreive_notes_for_user(user_id) -> List[Note]:
        print('user_id', user_id)
        notes = await notes_collection.find(Note.createdByUserId == user_id).to_list()
        return notes


    async def retrieve_note(id: Note) -> Note:
        note = await notes_collection.get(str(id))
        if note:
            return note
        

    async def delete_note(id: PydanticObjectId) -> bool:
        try:
            note = await notes_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if note:
            await note.delete()
            return True


    async def update_note_data(id: PydanticObjectId, data: dict) -> Union[bool, Note]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        note = await notes_collection.get(str(id))
        if note:
            await note.update(update_query)
            return note
        return False

