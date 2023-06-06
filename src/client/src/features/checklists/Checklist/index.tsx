import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../redux/store'
import checklistActions from '../../../redux/actions/checklist'
import { Button, Divider, Dropdown, Input, Progress, Tag } from 'antd'
import type { MenuProps } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, DownOutlined, EditOutlined, EllipsisOutlined, FieldTimeOutlined, PlusOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons'
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
    const [pctComplete, setPctComplete] = useState<any>(0)
    const [editingKey, setEditingKey] = useState<any>()
    const [editingText, setEditingText] = useState<any>('')

    useEffect(() => {
        store.dispatch(checklistActions.setChecklists(currentUser?._id))
    }, [currentUser])

    useMemo(() => {
        const active = userChecklists.find((c: any) => c?.id === props.checklistData)
        setActiveChecklist(active)
    }, [props.checklistData])

    useMemo(() => {
        const completeItems = activeChecklist?.items?.filter((itm: any) => itm.state === 'complete')
        const pctComp = (completeItems?.length / activeChecklist?.items?.length) * 100

        setPctComplete(Math.round(pctComp))
    }, [activeChecklist?.items])

    const enterNewChecklistItem = () => {
        console.log('enter checklist item')
        setShowEditableRow(true)
    }

    const onNewChecklistItemChange = (value: any) => {
        console.log('value', value)
        setNewItemText(value)
    }

    const onChecklistItemEdit = (value: any) => {
        console.log('value', value)
        setEditingText(value)
        // const input = document.getElementById('editableChecklistInput')
        // input?.focus()
    }

    const handleInputFocus = (event: any) => {
        event.target.focus();
    };

    const addNewChecklistItem = () => {
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
        const cList = {...activeChecklist}
        let cListItems = [...cList?.items]
        let cListToUpdate = cListItems.find((c: any) => c?.key === key)
        cListToUpdate.state = 'complete'
        cList.items = cListItems
        setActiveChecklist(cList)

        store.dispatch(checklistActions.update(cList?.id , cList))
    }

    const markItemAsIncomplete = (key: any) => {
        const cList = {...activeChecklist}
        let cListItems = [...cList?.items]
        let cListToUpdate = cListItems.find((c: any) => c?.key === key)
        cListToUpdate.state = 'incomplete'
        cList.items = cListItems
        setActiveChecklist(cList)

        store.dispatch(checklistActions.update(cList?.id , cList))
    }

    const markItemInProgress = (key: any) => {
        const cList = {...activeChecklist}
        let cListItems = [...cList?.items]
        let cListToUpdate = cListItems.find((c: any) => c?.key === key)
        cListToUpdate.state = 'in-progress'
        cList.items = cListItems
        setActiveChecklist(cList)

        store.dispatch(checklistActions.update(cList?.id , cList))
    }

    const editChecklistItem = (key: any) => {
        console.log('key', key)
        setEditingKey(key)
        const cList = {...activeChecklist}
        const cListItems = [...cList?.items]

        const oldItem = cListItems.find((itm:any) => itm.key === key)
        setEditingText(oldItem?.title)
    }

    const saveEditedChecklist = () => {
        const cList = {...activeChecklist}
        const cListItems = [...cList?.items]

        const oldItem = cListItems.find((itm:any) => itm.key === editingKey)
        oldItem.title = editingText
        cList.items = cListItems
        setActiveChecklist(cList)
        store.dispatch(checklistActions.update(cList?.id , cList))
        setEditingKey(null)
        setEditingText(null)
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
                        <a onClick={() => markItemInProgress(itm?.key)}>
                            Set as Active
                        </a>
                    ),
                    icon: <FieldTimeOutlined />
                },
                {
                    key: '4',
                    label: (
                        <a onClick={() => editChecklistItem(itm?.key)}>
                            Edit item
                        </a>
                    ),
                    icon: <EditOutlined />
                },
                {
                    key: '5',
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
                                    color="green" 
                                    className='complete-tag'
                                    style={{
                                        borderRadius: '10px',
                                        height: '20px',
                                        width: '20px',
                                        display:'flex'
                                    }}
                                > </Tag>
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
                                > </Tag>
                            )
                            : null
                        }
                        {
                            itm?.state === 'in-progress'
                            ? (
                                <Tag 
                                    className='in-progress-tag'
                                    color="blue" 
                                    style={{
                                        borderRadius: '10px',
                                        height: '20px',
                                        width: '20px',
                                    }}
                                >  </Tag>
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
                            <h5 className='m-0 p-0'>
                                { 
                                    editingKey != itm?.key
                                    ? itm?.title
                                    : (
                                        <Input
                                            id='editableChecklistInput'
                                            value={editingText}
                                            onChange={(e) => onChecklistItemEdit(e?.target?.value)}
                                            onFocus={handleInputFocus}
                                        />
                                    )
                                }
                            </h5>
                        </div>
                        <div>
                            {
                                editingKey != itm?.key
                                ? (
                                    <Dropdown menu={{ items }} placement="bottomLeft">
                                        <Button size="small">
                                            <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                )
                                : (
                                    <div>
                                        <Button size="small" onClick={() => saveEditedChecklist()}>
                                            <SaveOutlined />
                                        </Button>
                                        <Button size="small" onClick={() => setEditingKey(null)}>
                                            <CloseOutlined />
                                        </Button>
                                    </div>
                                )
                            }
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
        <div className='p-2'>
            <div className='flex w-100 jc-sb pt-2'>
                <div>
                    Title: {activeChecklist?.title}
                    <Progress size="small" percent={pctComplete} status="active" />
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