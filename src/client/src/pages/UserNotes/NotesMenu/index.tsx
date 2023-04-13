import { CloseOutlined, MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { groupByProperty } from '../../../helpers'
import './styles.css'
import { Button, Popconfirm } from 'antd'
import noteActions from '../../../redux/actions/notes'
import { store } from '../../../redux/store'


interface NotesMenuProps {
    onNoteSelect?: any
}

export default function NotesMenu(props: NotesMenuProps) {

    const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])
    const [sortedNotes, setSortedNotes] = useState<any>({})
    const [dailyNotes, setDailyNotes] = useState<any>([])
    const [menuView, setMenuView] = useState<any>('daily')

    useEffect(() => { // sort notes when notes update
		const sn = groupByProperty(userNotes, 'category')
		const intNotes = Object.assign({All: userNotes}, {...sn});
		setSortedNotes(intNotes)
	}, [userNotes])

    useEffect(() => {
        const filtered = userNotes.filter((n: any) => n.category == "daily" )
        setDailyNotes(filtered)
    }, [userNotes])


    return (
        <div className='notes-menu-wrapper'>
            <div className='pl-2 pt-2 pb-1 flex jc-sb'>
                <h4>Notes</h4>
                <div className='flex'>
                    <div className='menu-select-option mr-1' onClick={() => setMenuView('daily')}>
                        <h5 className='ml-1 mr-1'>Daily</h5>
                    </div>
                    <div className='menu-select-option mr-1'  onClick={() => setMenuView('categories')}>
                        <h5 className='ml-1 mr-1'>Categories</h5>
                    </div>
                    <div className='menu-select-option mr-1'  onClick={() => setMenuView('all')}>
                        <h5 className='ml-1 mr-1'>All</h5>
                    </div>
                </div>
            </div>
            <div className='divider'/>
            <div className='pl-2 pt-2'>
                {/* {
                    userNotes?.map((item:any) => {
                        return (
                            <div 
                                onClick={() => props.onNoteSelect(item)}
                                key={`${item?.id}`}
                                className='daily-note-menu-item'
                            >
                                {item?.title}
                            </div>
                        )
                    }) || []
                } */}

                {
                    menuView == 'daily'
                    ? (
                        <DailyNotesMenu
                            filteredNotes={dailyNotes}
                            onNoteSelect={props.onNoteSelect}
                        />
                    ) : null
                }
                {
                    menuView == 'all'
                    ? (
                        <AllNotesMenu
                            onNoteSelect={props.onNoteSelect}
                        />
                    ) : null
                }
                {
                    menuView == 'categories'
                    ? (
                        <NotesByCategoryMenu
                            sortedNotes={sortedNotes}
                            onNoteSelect={props.onNoteSelect}
                        />
                    ) : null
                }
                
            </div>
        </div>
    )
}




interface DailyNotesProps {
    filteredNotes?: any
    onNoteSelect?: any
}

function DailyNotesMenu(props: DailyNotesProps) {

    console.log(props.filteredNotes)

    return (
        <div>
            {
                props.filteredNotes?.map((item:any) => {
                    return (
                        <div 
                            onClick={() => props.onNoteSelect(item)}
                            key={`${item?.id}`}
                            className='daily-note-menu-item'
                        >
                            {item?.title}
                        </div>
                    )
                }) || []
            }
        </div>
    )
}



interface NotesByCategoryProps {
    sortedNotes?: any
    onNoteSelect?: any
}

function NotesByCategoryMenu(props: NotesByCategoryProps) {

    interface RowProps {
        rowData?: any
        onNoteSelect?: any
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
                                            onClick={() => props.onNoteSelect(item)}
                                            key={`${item?.id}`}
                                            className='daily-note-menu-item'
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
                Object.entries(props.sortedNotes)?.map((item:any) => {
                    return (
                        <div 
                            //onClick={() => props.onNoteSelect(item)}
                            //key={`${item?.id}`}
                            //className='daily-note-menu-item'
                        >
                            <CategoryRow
                                rowData={item}
                                onNoteSelect={props.onNoteSelect}
                            />
                        </div>
                    )
                }) || []
            }
        </div>
    )
}



interface AllNotesProps {
    onNoteSelect?: any
}

function AllNotesMenu(props: AllNotesProps) {

    const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])

    const deleteEvent = (noteID: any) => {
        store.dispatch(noteActions.delete(noteID))
    }
 
    return (
        <div>
            {
                userNotes?.map((item:any) => {
                    return (
                        <div 
                            onClick={() => props.onNoteSelect(item)}
                            key={`${item?.id}`}
                            className='daily-note-menu-item flex jc-sb'
                        >
                            <div>
                                {item?.title}
                            </div>
                            <div className='pr-2'>
                            <Popconfirm
                                placement="bottomLeft"
                                title={"Are you sure you want to delete this note?"}
                                //description={"Are you sure you want to delete this note?"}
                                onConfirm={() => deleteEvent(item?.id)}
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