import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../redux/store'
import checklistActions from '../../../redux/actions/checklist'
import { Button, Divider, Dropdown, Input, Tag } from 'antd'
import type { MenuProps } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DownOutlined, EllipsisOutlined, FieldTimeOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { checklistService } from '../../../services/checklist.service'
import './styles.css'
import { arrayRemove, generateId } from '../../../helpers'

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
                state: 'incomplete',
                key: generateId()
            }
        )
        if (cList._id) cList.id = cList._id
        cList.items = cListItems
        console.log('cList', cList)
        setActiveChecklist(cList)

        store.dispatch(checklistActions.update(cList?.id , cList))
    }


    const deleteChecklistItem = (key: any) => {
        const cList = {...activeChecklist}
        let cListItems = [...cList?.items]
        const cListToDelete = cListItems.find((c: any) => c?.key === key)
        cListItems = arrayRemove(cListItems, cListToDelete)
        cList.items = cListItems
        setActiveChecklist(cList)

        store.dispatch(checklistActions.update(cList?.id , cList))
    }

    const markItemAsCompleted = (key: any) => {
        console.log('Item completed')
        const cList = {...activeChecklist}
        let cListItems = [...cList?.items]
        let cListToUpdate = cListItems.find((c: any) => c?.key === key)
        cListToUpdate.state = 'complete'
        console.log('cListToUpdate', cListToUpdate)
        console.log('cListItems', cListItems)
        cList.items = cListItems
        setActiveChecklist(cList)

        store.dispatch(checklistActions.update(cList?.id , cList))
    }

    const markItemAsIncomplete = (key: any) => {
        console.log('Item completed')
        const cList = {...activeChecklist}
        let cListItems = [...cList?.items]
        let cListToUpdate = cListItems.find((c: any) => c?.key === key)
        cListToUpdate.state = 'incomplete'
        console.log('cListToUpdate', cListToUpdate)
        console.log('cListItems', cListItems)
        cList.items = cListItems
        setActiveChecklist(cList)

        store.dispatch(checklistActions.update(cList?.id , cList))
    }

    const markItemInProgress = () => {
        console.log('item in progress')
    }

    function ChecklistItemRender() {



        const itms = activeChecklist?.items?.map((itm:any, i:any) => {

            const items: MenuProps['items'] = [
                {
                    key: '1',
                    label: (
                        <a onClick={() => markItemAsCompleted(itm?.key)}>
                            Mark as complete
                        </a>
                    ),
                    icon: <CheckCircleOutlined />
                },
                {
                    key: '2',
                    label: (
                        <a onClick={() => markItemAsIncomplete(itm?.key)}>
                            Mark as incomplete
                        </a>
                    ),
                    icon: <CheckCircleOutlined />
                },
                {
                    key: '3',
                    label: (
                        <a onClick={() => console.log('Set As Active')}>
                            Set as Active
                        </a>
                    ),
                    icon: <FieldTimeOutlined />
                },
                {
                    key: '4',
                    label: (
                        <a onClick={() => deleteChecklistItem(itm?.key)}>
                            Delete item
                        </a>
                    ),
                    icon: <CloseCircleOutlined />
                },
            ];

            return (
                <div 
                    className='flex w-100 checklist-row'
                    key={`checklist-itm-${i}`}
                    style={{
                        height: '30px',
                        alignItems: 'center'
                    }}
                >
                    <div 
                        style={{
                            display: 'flex',
                            height: '30px',
                            alignItems: 'center'
                        }}
                    >
                        {
                            itm?.state === 'complete'
                            ? (
                                <Tag 
                                    color="blue" 
                                    className='complete-tag'
                                    style={{
                                        borderRadius: '10px',
                                        height: '20px',
                                        width: '20px',
                                    }}
                                />
                            )
                            : null
                        }
                        {
                            itm?.state === 'incomplete'
                            ? (
                                <Tag 
                                    className='incomplete-tag'
                                    color="default" 
                                    style={{
                                        borderRadius: '10px',
                                        height: '20px',
                                        width: '20px',
                                    }}
                                />
                            )
                            : null
                        }
                        {
                            itm?.state === 'in-progress'
                            ? (
                                <Tag 
                                    className='incomplete-tag'
                                    color="green" 
                                    style={{
                                        borderRadius: '10px',
                                        height: '20px',
                                        width: '20px',
                                    }}
                                />
                            )
                            : null
                        }
                    </div>
                    <div className='flex w-100 jc-sb'>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <h5 className='m-0 p-0'>{itm?.title}</h5>
                        </div>
                        <div>
                            <Dropdown menu={{ items }} placement="bottomLeft">
                                <Button size="small">
                                    <DownOutlined />
                                </Button>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            )
        }) || []

        return (
            <div className='w-100'>
                {itms}
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