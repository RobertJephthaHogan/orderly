import { CloseOutlined } from '@ant-design/icons'
import { Button, Tabs } from 'antd'
import React from 'react'
import Draggable from 'react-draggable'
import NewTaskForm from '../../../components/forms/NewTaskForm'
import widgetActions from '../../../redux/actions/widget'
import { store } from '../../../redux/store'
import './styles.css'



export default function TaskWidget() {

    const closeWidget = () => {
        store.dispatch(widgetActions.hideTaskWidget())
    }

    const items = [
        {
            label: 'Task Form',
            key: 'Task Form',
            children: (
                <div>
                    <NewTaskForm />
                </div>
            )
        },
        {
            label: 'Tasks',
            key: 'Tasks',
            children: (
                <div>
                    TasksTasksTasksTasksTasksTasksTasks
                </div>
            )
        },
    ]

    return (
        <Draggable handle='.task-widget-header'>
            <div className='task-widget'>
                <div className='task-widget-header'>
                    <div className='flex'>
                        {/* <h5 className='m-0 p-0'>Task Widget</h5> */}
                    </div>
                    <div>
                        <Button 
                            type='text' 
                            className='btn-close-task-widget'
                            style={{height:"auto"}}
                            onClick={() => closeWidget()}
                        >
                            <h6 className='p-0 m-0'>
                                <CloseOutlined className='p-0 m-0'/>
                            </h6>
                        </Button>
                    </div>
                </div>
                <div className='task-widget-body'>
                    <Tabs items={items} />
                </div>
            </div>
        </Draggable>
    )
}