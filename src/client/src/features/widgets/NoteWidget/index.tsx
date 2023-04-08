import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Draggable from 'react-draggable'
import widgetActions from '../../../redux/actions/widget'
import { store } from '../../../redux/store'
import './styles.css'
import { NoteForm } from '../../../components/forms/NoteForm'



export default function NoteWidget() {

    const closeWidget = () => {
        store.dispatch(widgetActions.hideNoteWidget())
    }

    const items = [
        {
            label: 'Note Form',
            key: 'Note Form',
            children: (
                <div>
                    <NoteForm />
                </div>
            )
        },
        {
            label: 'Notes',
            key: 'Notes',
            children: (
                <div>
                    Notes
                </div>
            )
        },
    ]

    return (
        <Draggable>
            <div className='note-widget'>
                <div className='note-widget-header'>
                    <div className='flex'>
                        {/* <h5 className='m-0 p-0'>Note Widget</h5> */}
                    </div>
                    <div>
                        <Button 
                            type='text' 
                            className='btn-close-note-widget'
                            style={{height:"auto"}}
                            onClick={() => closeWidget()}
                        >
                            <h6 className='p-0 m-0'>
                                <CloseOutlined className='p-0 m-0'/>
                            </h6>
                        </Button>
                    </div>
                </div>
                <div className='note-widget-body'>
                    Note Widget
                </div>
            </div>
        </Draggable>
    )
}