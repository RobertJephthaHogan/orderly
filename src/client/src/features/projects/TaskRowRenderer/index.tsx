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


    const deleteUserTask = (e: any, taskID: any) => {
        e.stopPropagation()
        store.dispatch(taskActions.delete(taskID))
    }

    const toggleTaskCompleted = (e: any, task: any) => {
        e.stopPropagation()
        const taskId = task.id
        let working = {...task}
        working['isCompleted'] = !task.isCompleted
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
                        onClick={(e) => toggleTaskCompleted(e, task)}
                    >
                        <CheckOutlined/>
                    </button>
                    <button 
                        className='btn-task-delete'
                        onClick={(e) => deleteUserTask(e, task.id)}
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