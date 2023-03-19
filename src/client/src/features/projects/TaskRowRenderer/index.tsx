import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import taskActions from '../../../redux/actions/tasks'
import { store } from '../../../redux/store'




type Props = {
    tasks?:any
    selectedTask?: any
    setSelectedTask?: any
}

export const TaskRowRenderer : React.FC<Props> = ({
    tasks,
    selectedTask,
    setSelectedTask
}) => {


    const deleteUserTask = (taskID: any) => {
        store.dispatch(taskActions.delete(taskID))
    }

    const toggleTaskCompleted = (task: any) => {
        const taskId = task.id
        console.log('task', task)
        console.log('isCompleted', task.isCompleted)
        let working = {...task}
        working['isCompleted'] = !task.isCompleted
        console.log('working', working)
        store.dispatch(taskActions.update(taskId, working))
    }


    const items = tasks?.map((task: any) => {
        const thisTaskActive = (task == selectedTask)
        return (
            <div 
                className={`flex space-between category-task ${thisTaskActive ? "active-task" : ""}`}
                onClick={() => setSelectedTask(task)}
                key={`task-${task?.id}`}
            >
                <div>
                    
                    {task.isCompleted ? <s><h5>{task.title}</h5></s> : <h5>{task.title}</h5>}
                </div>
                <div>
                    <button 
                        className='btn-task-complete'
                        onClick={() => toggleTaskCompleted(task)}
                    >
                        <CheckOutlined/>
                    </button>
                    <button 
                        className='btn-task-delete'
                        onClick={() => deleteUserTask(task.id)}
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