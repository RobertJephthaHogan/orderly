import React from 'react'
import { store } from '../../../redux/store'
import widgetActions from '../../../redux/actions/widget'
import Draggable from 'react-draggable'
import { Button, Tabs } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './styles.css'
import IntakeForm from '../../../components/forms/IntakeForm'



export default function IntakeWidget() {

    const closeWidget = () => {
        store.dispatch(widgetActions.hideIntakeWidget())
    }

    const items = [
        {
            label: 'Intake Form',
            key: 'Intake Form',
            children: (
                <div>
                    <IntakeForm/>
                </div>
            )
        },
        {
            label: 'Intake',
            key: 'Intake',
            children: (
                <div>
                    IntakeIntakeIntakeIntakeIntakeIntakeIntakeIntakeIntake
                </div>
            )
        },
    ]

    return (
        <Draggable handle='.intake-widget-header'>
            <div className='intake-widget'>
                <div className='intake-widget-header'>
                    <div className='flex'>
                        {/* <h5 className='m-0 p-0'>Intake Widget</h5> */}
                    </div>
                    <div>
                        <Button 
                            type='text' 
                            className='btn-close-intake-widget'
                            style={{height:"auto"}}
                            onClick={() => closeWidget()}
                        >
                            <h6 className='p-0 m-0'>
                                <CloseOutlined className='p-0 m-0'/>
                            </h6>
                        </Button>
                    </div>
                </div>
                <div className='intake-widget-body'>
                    <Tabs items={items} />
                </div>
            </div>
        </Draggable>
    )
}