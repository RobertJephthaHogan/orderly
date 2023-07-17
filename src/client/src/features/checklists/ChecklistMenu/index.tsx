import React, { useEffect, useState } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { groupByProperty } from '../../../helpers'
import { store } from '../../../redux/store'
import checklistActions from '../../../redux/actions/checklist'
import { CloseOutlined, MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'


interface ChecklistProps {
    onSelect?: any
}

export default function ChecklistMenu (props: ChecklistProps) {
    
    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userChecklists = useSelector((state: any) => state.checklists?.queryResult ?? [])
    const [menuView, setMenuView] = useState<any>('daily')
    const [sortedChecklists, setSortedChecklists] = useState<any>({})
    const [dailyChecklists, setDailyChecklists] = useState<any>([])


    useEffect(() => {
        store.dispatch(checklistActions.setChecklists(currentUser?._id))
    }, [currentUser])

    useEffect(() => { // sort Checklists when Checklists update
		const sc = groupByProperty(userChecklists, 'category')
		const sorted = Object.assign({All: userChecklists}, {...sc});
		setSortedChecklists(sorted)
	}, [userChecklists])

    useEffect(() => {
        const filtered = userChecklists.filter((n: any) => n.category == "Daily" )
        setDailyChecklists(filtered)
    }, [userChecklists])


    return (
        <div className='checklist-menu-component'>
            <div className='flex jc-sb p-2'>
                <div>
                    <h4>Checklists</h4>
                </div>
                <div className='flex'>
                    <div className='menu-select-option mr-1'  onClick={() => setMenuView('daily')}>
                        <h5 className='ml-1 mr-1'>Daily</h5>
                    </div>
                    <div  className='menu-select-option mr-1'  onClick={() => setMenuView('categories')}>
                        <h5 className='ml-1 mr-1'>Categories</h5>
                    </div>
                    <div  className='menu-select-option'  onClick={() => setMenuView('all')}>
                        <h5 className='ml-1 mr-1'>All</h5>
                    </div>
                </div>
            </div>
            <div className='divider'/>
            <div 
                className='pl-2 pt-2'
                style={{
                    maxHeight: '700px',
                    overflowY: 'scroll'
                }}
            >
                {
                    menuView == 'daily'
                    ? (
                        <DailyChecklistsMenu
                            filtered={dailyChecklists}
                            onSelect={props.onSelect}
                        />
                    ) : null
                }
                {
                    menuView == 'categories'
                    ? (
                        <ChecklistsByCategoryMenu
                            sorted={sortedChecklists}
                            onSelect={props.onSelect}
                        />
                    ) : null
                }
                {
                    menuView == 'all'
                    ? (
                        <AllChecklistsMenu
                            onSelect={props.onSelect}
                        />
                    ) : null
                }
            </div>
        </div>
    )
}






interface DailyChecklistsProps {
    filtered?: any
    onSelect?: any
}

function DailyChecklistsMenu(props: DailyChecklistsProps) {

    return (
        <div>
            {
                props.filtered?.map((item:any) => {
                    return (
                        <div 
                            onClick={() => props.onSelect(item)}
                            key={`${item?.id}`}
                            className='daily-checklist-menu-item'
                        >
                            {item?.title}
                        </div>
                    )
                }) || []
            }
        </div>
    )
}





interface ChecklistsByCategoryProps {
    sorted?: any
    onSelect?: any
}

function ChecklistsByCategoryMenu(props: ChecklistsByCategoryProps) {

    interface RowProps {
        rowData?: any
        onSelect?: any
    }

    function CategoryRow(props: RowProps) {

        const [expanded, setExpanded] = useState<boolean>(false)

        const onExpandToggle = (e: any) => {
            setExpanded(!expanded)
        }

        return (
            <div>
                <div className='flex'>
                    <div>
                        {
                            expanded ? (
                                <MinusSquareOutlined
                                    onClick={onExpandToggle}
                                />
                            ) : (
                                <PlusSquareOutlined
                                    onClick={onExpandToggle}
                                />
                            )
                        }
                    </div>
                    <div className='ml-2'>
                        {props.rowData[0]}
                    </div>
                </div>
                {
                    expanded 
                    ? (
                        <div className='ml-5'>
                            {
                                props.rowData[1]?.map((item:any) => {
                                    return (
                                        <div 
                                            onClick={() => props.onSelect(item)}
                                            key={`${item?.id}`}
                                            className='daily-checklist-menu-item'
                                        >
                                            {item?.title}
                                        </div>
                                    )
                                }) || []
                            }
                        </div>
                    ) : null
                }
            </div>
        )
    }

    return (
        <div>
            {
                Object.entries(props.sorted)?.map((item:any) => {
                    return (
                        <div 
                            //onClick={() => props.onNoteSelect(item)}
                            //key={`${item?.id}`}
                            //className='daily-checklist-menu-item'
                        >
                            <CategoryRow
                                rowData={item}
                                onSelect={props.onSelect}
                            />
                        </div>
                    )
                }) || []
            }
        </div>
    )
}







interface AllChecklistsProps {
    onSelect?: any
}

function AllChecklistsMenu(props: AllChecklistsProps) {

    const userChecklists = useSelector((state: any) => state.checklists?.queryResult ?? [])

    const deleteChecklist = (id: any) => {
        store.dispatch(checklistActions.delete(id))
    }
 
    return (
        <div>
            {
                userChecklists?.map((item:any) => {
                    return (
                        <div 
                            onClick={() => props.onSelect(item)}
                            key={`${item?.id}`}
                            className='daily-checklist-menu-item flex jc-sb'
                        >
                            <div>
                                {item?.title}
                            </div>
                            <div className='pr-2'>
                            <Popconfirm
                                placement="bottomLeft"
                                title={"Are you sure you want to delete this checklist?"}
                                //description={"Are you sure you want to delete this checklist?"}
                                onConfirm={() => deleteChecklist(item?.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    type='text'
                                    style={{
                                        height: 'unset',
                                        padding: '0 5px',
                                        margin: '0'
                                    }}
                                >
                                    <CloseOutlined/>
                                </Button>
                            </Popconfirm>
                            </div>
                        </div>
                    )
                }) || []
            }
        </div>
    )
}