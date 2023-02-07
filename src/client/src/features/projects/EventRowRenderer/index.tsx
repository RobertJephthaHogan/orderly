import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import eventActions from '../../../redux/actions/event'
import { store } from '../../../redux/store'




type Props = {
    events?:any
}

export const EventRowRenderer : React.FC<Props> = ({
    events
}) => {

    const [selectedEvent, setSelectedEvent] = useState<any>(null)

    const deleteUserEvent = (eventID: any) => {
        store.dispatch(eventActions.delete(eventID))
    }


    const items = events?.map((evt: any) => {
        const thisTaskActive = (evt == selectedEvent)
        return (
            <div 
                className={`flex space-between category-task ${thisTaskActive ? "active-task" : ""}`}
                onClick={() => setSelectedEvent(evt)}
                key={`task-${evt?.id}`}
            >
                <div>
                    <h5>{evt.title}</h5>
                </div>
                <div>
                    <button className='btn-task-complete'>
                        <CheckOutlined/>
                    </button>
                    <button 
                        className='btn-task-delete'
                        onClick={() => deleteUserEvent(evt.id)}
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