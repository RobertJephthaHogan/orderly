import { CloseOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import noteActions from '../../../redux/actions/notes'
import { store } from '../../../redux/store'


type Props = {
    notes?: any
}

export const NotesRowRenderer : React.FC<Props> = ({
    notes
}) => {

    const [selectedTask, setSelectedTask] = useState<any>(null)

    const deleteUserTask = (noteID: any) => {
        store.dispatch(noteActions.delete(noteID))
    }


    const items = notes?.map((note: any) => {
        const thisTaskActive = (note == selectedTask)
        return (
            <div 
                className={`flex space-between category-task ${thisTaskActive ? "active-task" : ""}`}
                onClick={() => setSelectedTask(note)}
                key={`task-${note?.id}`}
            >
                <div>
                    <h5>{note.title}</h5>
                </div>
                <div>
                    {/* <button className='btn-task-complete'>
                        <CheckOutlined/>
                    </button> */}
                    <button 
                        className='btn-task-delete'
                        onClick={() => deleteUserTask(note?.id)}
                    >
                        <CloseOutlined/>
                    </button>
                </div>
            </div>
        )
        
    }) || []

    return (
        <div>
            {items}
        </div>
    )
}