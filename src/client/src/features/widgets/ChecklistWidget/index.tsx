import React from 'react'
import { store } from '../../../redux/store'
import widgetActions from '../../../redux/actions/widget'
import Draggable from 'react-draggable'
import { Button, Tabs } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './styles.css'



export default function ChecklistWidget() {

    const closeWidget = () => {
        store.dispatch(widgetActions.hideChecklistWidget())
    }

    const items = [
        {
            label: 'Checklist Form',
            key: 'Checklist Form',
            children: (
                <div>
                    Checklist Form Will be here ---------------
                </div>
            )
        },
        {
            label: 'Checklist',
            key: 'Checklist',
            children: (
                <div>
                    ChecklistChecklistChecklistChecklistChecklistChecklist
                </div>
            )
        },
    ]

    return (
        <Draggable>
            <div className='checklist-widget'>
                <div className='checklist-widget-header'>
                    <div className='flex'>
                        {/* <h5 className='m-0 p-0'>Task Widget</h5> */}
                    </div>
                    <div>
                        <Button 
                            type='text' 
                            className='btn-close-checklist-widget'
                            style={{height:"auto"}}
                            onClick={() => closeWidget()}
                        >
                            <h6 className='p-0 m-0'>
                                <CloseOutlined className='p-0 m-0'/>
                            </h6>
                        </Button>
                    </div>
                </div>
                <div className='checklist-widget-body'>
                    <Tabs items={items} />
                </div>
            </div>
        </Draggable>
    )
}