import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Tabs } from 'antd'
import Draggable from 'react-draggable'
import widgetActions from '../../../redux/actions/widget'
import { store } from '../../../redux/store'
import './styles.css'
import { ProjectEditor } from '../../projects/ProjectEditor'



export default function ProjectWidget() {

    
    const closeWidget = () => {
        store.dispatch(widgetActions.hideProjectWidget())
    }

    const items = [
        {
            label: 'New Project Form',
            key: 'New Project Form',
            children: (
                <div>
                    <ProjectEditor
                        activeProject={false}
                        editorType={'new'}
                    />
                </div>
            )
        },
        {
            label: 'Projects',
            key: 'Projects',
            children: (
                <div>
                    Projects
                </div>
            )
        },
    ]


    return (
        <Draggable handle='.project-widget-header'>
            <div className='project-widget'>
                <div className='project-widget-header'>
                    <div className='flex'>
                        {/* <h5 className='m-0 p-0'>project Widget</h5> */}
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
                <div className='project-widget-body'>
                    <Tabs items={items} />
                </div>
            </div>
        </Draggable>
    )
}