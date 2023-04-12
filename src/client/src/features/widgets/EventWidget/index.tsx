import { CloseOutlined } from '@ant-design/icons'
import { Button, Tabs } from 'antd'
import React, { useMemo, useState } from 'react'
import Draggable from 'react-draggable'
import widgetActions from '../../../redux/actions/widget'
import { store } from '../../../redux/store'
import './styles.css'
import NewEventForm from '../../../components/forms/NewEventForm'
import { useSelector } from 'react-redux'



export default function EventWidget() {

    const eventWidget = useSelector((state: any) => state.widgets?.eventWidget ?? [])
    const [activeProject, setActiveProject] = useState<any>(false)
    const [editorType, setEditorType] = useState<any>('add')


    useMemo(() => {
        if (eventWidget?.activeProject) {
            setActiveProject(eventWidget?.activeProject)
        }
        if (eventWidget?.editorType) {
            setEditorType(eventWidget?.editorType)
        }
    }, [eventWidget])

    const closeWidget = () => {
        store.dispatch(widgetActions.hideEventWidget())
    }

    const items = [
        {
            label: 'Event Form',
            key: 'Event Form',
            children: (
                <div>
                    <NewEventForm 
                        formOperation={editorType}
                    />
                </div>
            )
        },
        {
            label: 'Events',
            key: 'Events',
            children: (
                <div>
                    EventEventEventEventEventEventEvent
                </div>
            )
        },
    ]

    return (
        <Draggable handle='.event-widget-header'>
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
                    <Tabs items={items} />
                </div>
            </div>
        </Draggable>
    )
}