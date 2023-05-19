import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../redux/store'
import checklistActions from '../../../redux/actions/checklist'
import { Button, Divider, Input, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { checklistService } from '../../../services/checklist.service'
import './styles.css'

interface ChecklistProps {
    checklistData?: any
}

export default function Checklist(props: ChecklistProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userChecklists = useSelector((state: any) => state.checklists?.queryResult ?? [])
    const [activeChecklist, setActiveChecklist] = useState<any>()
    const [showEditableRow, setShowEditableRow] = useState<any>(false)
    const [newItemText, setNewItemText] = useState<any>()

    useEffect(() => {
        store.dispatch(checklistActions.setChecklists(currentUser?._id))
    }, [currentUser])

    useMemo(() => {
        const active = userChecklists.find((c: any) => c?.id === props.checklistData)
        console.log('active', active)
        setActiveChecklist(active)
    }, [props.checklistData])

    const enterNewChecklistItem = () => {
        console.log('enter checklist item')
        setShowEditableRow(true)
    }

    const onNewChecklistItemChange = (value: any) => {
        console.log('value', value)
        setNewItemText(value)
    }

    const addNewChecklistItem = () => {
        console.log('add checklist item')
        setShowEditableRow(false)
        const cList = {...activeChecklist}
        const cListItems = [...cList?.items]
        cListItems.push(
            {
                title: newItemText,
                isComplete: false,
            }
        )
        if (cList._id) cList.id = cList._id
        cList.items = cListItems
        console.log('cList', cList)

        // checklistService.updateChecklist(cList?.id, cList)
        //     .then((resp: any) => {
        //         console.log('resp', resp)
        //     })
        //     .catch((err: any) => {
        //         console.error(err)
        //     })

        store.dispatch(checklistActions.update(cList?.id , cList))
    }

    function ChecklistItemRender() {

        const items = activeChecklist?.items?.map((itm:any, i:any) => {

            return (
                <div 
                    className='flex w-100 checklist-row'
                    key={`checklist-itm-${i}`}
                >
                    <div>
                        {
                            itm?.isComplete
                            ? (
                                <Tag color="blue" />
                            )
                            : null
                        }
                        {
                            !itm?.isComplete
                            ? (
                                <Tag color="red" className='h-100 ' style={{borderRadius: '10px'}}/>
                            )
                            : null
                        }
                    </div>
                    <div>
                        <h5 className='m-0 p-0'>{itm?.title}</h5>
                    </div>
                </div>
            )
        }) || []

        return (
            <div className='w-100'>
                {items}
            </div>
        )

    }

    return (
        <div>
            <div className='flex w-100 jc-sb pt-2'>
                <div>
                    Title: {activeChecklist?.title}
                </div>
                <div>
                    <Button
                        onClick={() => enterNewChecklistItem()}
                    >
                        <PlusOutlined/>
                    </Button>
                </div>
            </div>
            <Divider/>
            <div>
                <div>
                    {
                        showEditableRow 
                        ? (
                            <div className='flex'>
                                <div className='w-100 p-1'>
                                    <Input
                                        placeholder='New Checklist Item'
                                        value={newItemText}
                                        onChange={(e) => onNewChecklistItemChange(e?.target?.value)}
                                    />
                                </div>
                                <div className='p-1'>
                                    <Button
                                        size='small'
                                        onClick={addNewChecklistItem}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        )
                        : null
                    }
                </div>
                <div>
                    <ChecklistItemRender />
                </div>
            </div>
        </div>
    )
}