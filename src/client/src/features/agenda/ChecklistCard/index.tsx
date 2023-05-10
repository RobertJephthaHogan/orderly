import { PlusOutlined } from '@ant-design/icons'
import { Button, Select } from 'antd'
import React from 'react'
import { store } from '../../../redux/store'
import widgetActions from '../../../redux/actions/widget'



interface CardProps {
    agendaChecklists?: any
}

export default function ChecklistCard(props: CardProps) {



    return (
        <div>
            <div className='pl-1 pr-1'>
                <h5>Checklist Card ({props.agendaChecklists?.length})</h5>
            </div>
            <div className='flex'>
                <div className='w-100'>
                    <Select
                        className='w-100 pl-1 pr-1'
                    />
                </div>
                <div className='pl-1 pr-1'>
                    <Button
                        onClick={() => store.dispatch(widgetActions.showChecklistWidget())}
                    >
                        <PlusOutlined/>
                    </Button>
                </div>
            </div>
            <div>
                checklist area
            </div>
        </div>
    )
}