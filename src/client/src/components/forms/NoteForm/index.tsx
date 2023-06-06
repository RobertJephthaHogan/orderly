import { ObjectID } from 'bson'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import noteActions from '../../../redux/actions/notes'
import { store } from '../../../redux/store'
import './styles.css'


type Props = {
    noteParent?: any
    onFinishAction?: any
}

export const NoteForm : React.FC<Props> = ({
    noteParent,
    onFinishAction
}) => {

    const [editingSubject, setEditingSubject] = useState<any>({})
    const currentUser = useSelector((state: any) => state.user?.data ?? [])

    const onEditingSubjectChange = (value: any, field: any) => {
        let workingObj = {...editingSubject}
        workingObj[field] = value
        setEditingSubject(workingObj)
    }

    const onFinish = () => {
        let dto = {...editingSubject}
        dto['id'] = new ObjectID().toString()
        dto['category'] = noteParent?.category ? noteParent?.category : ''
        dto['parent'] = noteParent?._id ? noteParent?._id : ''
        dto['createdByUserId'] = currentUser?._id
        dto['noteCreationTime'] = new Date().toJSON()
        dto['dailyNoteForDate'] = new Date().toJSON()
        store.dispatch(noteActions.add(dto))
        if (onFinishAction) {
            onFinishAction()
        }
    }

    return (
        <div className='note-section'>
            <div className=" flex p-1">
                <div className="w-100">
                    <input
                        placeholder='Note Title'
                        type='text'
                        onChange={(e) => onEditingSubjectChange( e?.target?.value, 'title' )}
                        id='note-title-input'
                        className='note-title-input'
                    />
                </div>
            </div>
            <div className="p-1">
                <textarea
                    placeholder='Note Body'
                    onChange={(e) => onEditingSubjectChange( e?.target?.value, 'body' )}
                    id='note-body-input'
                    className='note-body-input'
                />
            </div>
            <div>
                <button onClick={onFinish}>
                    Submit
                </button>
            </div>
        </div>
    )
}