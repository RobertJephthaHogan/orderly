import { CheckOutlined, CloseOutlined, EllipsisOutlined, ShopFilled } from '@ant-design/icons'
import React, { useEffect, useMemo, useState } from 'react'
import taskActions from '../../../redux/actions/tasks'
import { store } from '../../../redux/store'
import { Button, Checkbox, Dropdown } from 'antd'
import './styles.css'



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

    const [showCompleted, setShowCompleted] = useState<boolean>(false)
    const [filteredTasks, setFilteredTasks] = useState<any>()
    const [taskRows, setTaskRows] = useState<any>()

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

    useEffect(() => {
        if (showCompleted) {
            setFilteredTasks(tasks)
        }
        if (!showCompleted) {
            const completd = tasks?.filter((task: any) => !task.isCompleted)
            setFilteredTasks(completd)
        }
    }, [tasks, showCompleted])

    useMemo(() => {
        const items = filteredTasks?.map((task: any) => {
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
        setTaskRows(items)
    }, [filteredTasks])


    return (
        <div>
            <div 
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #dfdfdf'
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flexEnd'
                }}>
                    <h6 className='m-0 p-0' style={{marginTop:'auto'}}>Task Name</h6>
                </div>
                <div>
                    <Dropdown dropdownRender={menu => (
                        <div className='top-bar-dropdown'>
                            <div className='brdr-b'>
                                <h4 className='pl-1 pt-1'>Options</h4>
                            </div>
                            <div className='flex jc-sb pl-1 pt-1'>
                                <h5>Show Completed?:</h5>
                                <Checkbox
                                    className='pr-2'
                                    checked={showCompleted}
                                    onChange={() => setShowCompleted(!showCompleted)}
                                />
                            </div>
                        </div>
                    )}>
                        <Button type="text">
                            <EllipsisOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </div>
            <div>
                {taskRows}
            </div>
        </div>
    )
}