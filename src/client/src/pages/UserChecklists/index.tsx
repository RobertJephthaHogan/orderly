import React, { useEffect } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import checklistActions from '../../redux/actions/checklist'
import ChecklistMenu from '../../features/checklists/ChecklistMenu'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import widgetActions from '../../redux/actions/widget'



export default function UserChecklists() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userChecklists = useSelector((state: any) => state.checklists?.queryResult ?? [])

    
    useEffect(() => {
        store.dispatch(checklistActions.setChecklists(currentUser?._id))
    }, [currentUser])

    console.log('userChecklists', userChecklists)

    

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
                        onSelect={(e: any) => console.log('onSelect',e)}
                    />
                </div>
                <div className='w-70 p-1'>
                    Checklist area
                </div>
            </div>
        </div>
    )
}