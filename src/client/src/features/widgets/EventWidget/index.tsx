import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import Draggable from 'react-draggable'
import widgetActions from '../../../redux/actions/widget'
import { store } from '../../../redux/store'
import './styles.css'



export default function EventWidget() {

    const closeWidget = () => {
        store.dispatch(widgetActions.hideTaskWidget())
    }

    return (
        <Draggable>
            <div className='event-widget'>
                <div className='event-widget-header'>
                    <div className='flex'>
                        {/* <h5 className='m-0 p-0'>Event Widget</h5> */}
                    </div>
                    <div>
                        <Button 
                            type='text' 
                            className='btn-close-event-widget'
                            style={{height:"auto"}}
                            onClick={() => closeWidget()}
                        >
                            <h6 className='p-0 m-0'>
                                <CloseOutlined className='p-0 m-0'/>
                            </h6>
                        </Button>
                    </div>
                </div>
                <div className='event-widget-body'>
                    Event Widget
                </div>
            </div>
        </Draggable>
    )
}