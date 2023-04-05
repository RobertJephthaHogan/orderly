import React from 'react'
import Draggable from 'react-draggable'




export default function TaskWidget() {

    return (
        <Draggable>
            <div className='task-widget'>
                Task Widget
            </div>
        </Draggable>
    )
}