import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import taskActions from '../../../redux/actions/tasks'
import { store } from '../../../redux/store'




type Props = {
    tasks?:any
}

export const TaskRowRenderer : React.FC<Props> = ({
    tasks
}) => {

    const [selectedTask, setSelectedTask] = useState<any>(null)

    const deleteUserTask = (taskID: any) => {
        store.dispatch(taskActions.delete(taskID))
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
                    <h5>{task.title}</h5>
                </div>
                <div>
                    <button className='btn-task-complete'>
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