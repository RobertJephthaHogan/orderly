import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import Draggable from 'react-draggable'
import widgetActions from '../../../redux/actions/widget'
import { store } from '../../../redux/store'
import './styles.css'



export default function TaskWidget() {

    const closeWidget = () => {
        store.dispatch(widgetActions.hideTaskWidget())
    }

    return (
        <Draggable>
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
                    Task Widget
                </div>
            </div>
        </Draggable>
    )
}