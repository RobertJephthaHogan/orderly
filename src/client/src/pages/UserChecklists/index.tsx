import React, { useEffect, useState } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import checklistActions from '../../redux/actions/checklist'
import ChecklistMenu from '../../features/checklists/ChecklistMenu'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import widgetActions from '../../redux/actions/widget'
import Checklist from '../../features/checklists/Checklist'



export default function UserChecklists() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userChecklists = useSelector((state: any) => state.checklists?.queryResult ?? [])
    const [activeChecklist, setActiveChecklist] = useState<any>()
    
    useEffect(() => {
        store.dispatch(checklistActions.setChecklists(currentUser?._id))
    }, [currentUser])


    return (
        <div className='user-checklists-component'>
            <div className='p-1'>
                <Button 
                    className='w-100'
                    onClick={() => store.dispatch(widgetActions.showChecklistWidget())}
                >
                    <PlusOutlined/>
                </Button>
            </div>
            <div className='w-100 flex'>
                <div className='w-30 p-1'>
                    <ChecklistMenu
                        onSelect={(e: any) => setActiveChecklist(e)}
                    />
                </div>
                <div className='w-70 p-1'>
                    <div 
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #dfdfdf'
                        }}
                    >
                        <Checklist
                            checklistData={activeChecklist?.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}