import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../redux/store'
import checklistActions from '../../../redux/actions/checklist'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'


interface ChecklistProps {
    checklistData?: any
}

export default function Checklist(props: ChecklistProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userChecklists = useSelector((state: any) => state.checklists?.queryResult ?? [])
    const [activeChecklist, setActiveChecklist] = useState<any>()
    const [showEditableRow, setShowEditableRow] = useState<any>(false)

    useEffect(() => {
        store.dispatch(checklistActions.setChecklists(currentUser?._id))
    }, [currentUser])

    useMemo(() => {
        const active = userChecklists.find((c: any) => c?.id === props.checklistData)
        console.log('active', active)
        setActiveChecklist(active)
    }, [props.checklistData])

    const addNewChecklistItem = () => {
        console.log('checklist item')
        setShowEditableRow(true)
    }

    return (
        <div>
            <div className='flex w-100 jc-sb pt-2'>
                <div>
                    Title: {activeChecklist?.title}
                </div>
                <div>
                    <Button
                        onClick={() => addNewChecklistItem()}
                    >
                        <PlusOutlined/>
                    </Button>
                </div>
            </div>
            <div>
                Checklist Body
                {
                    showEditableRow 
                    ? (
                        <div>
                            true
                        </div>
                    )
                    : null
                }
            </div>
        </div>
    )
}