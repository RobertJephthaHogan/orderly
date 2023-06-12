import { PlusOutlined } from '@ant-design/icons'
import { Button, Select } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import widgetActions from '../../../redux/actions/widget'
import { store } from '../../../redux/store'
import noteActions from '../../../redux/actions/notes'
import NoteEditor from '../NoteEditor'



export default function NoteCard() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
	const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])
    const [selectedDay, setSelectedDay] = useState<any>(new Date())
    const [notesForSelectedDate, setNotesForSelectedDate] = useState<any>()
    const [noteOptions, setNoteOptions] = useState<any>()
    const [selectedNote, setSelectedNote] = useState<any>()

    useEffect(() => {
        store.dispatch(noteActions.setNotes(currentUser?._id))
    }, [currentUser])

    function datesMatch(date1: any, date2: any) {
        return date1.getFullYear() === date2.getFullYear() 
          && date1.getMonth() === date2.getMonth() 
          && date1.getDate() === date2.getDate();
    }
    
    useEffect(() => {
        console.log('userNotes', userNotes)
        const currentNotes = userNotes?.filter((note: any) => {
            return datesMatch(new Date(note?.noteCreationTime), selectedDay)
        })
        setNotesForSelectedDate(currentNotes)
    }, [userNotes])

    useEffect(() => {
        console.log('notesForSelectedDate', notesForSelectedDate)
    }, [notesForSelectedDate])

    useEffect(() => {
        const options = notesForSelectedDate?.map((note: any) => {
            return {
                value: note?.id,
                label: note?.title
            }
        }) || []
        setNoteOptions(options)
        setSelectedNote(options?.[0]?.value)
    }, [notesForSelectedDate])

    return (
        <div>
            <div className='flex jc-sb p-2'>
                <div>
                    <h5>Notes:</h5>
                </div>
                <div>
                    <Button onClick={() => store.dispatch(widgetActions.showNoteWidget())} size='small'>
                        <PlusOutlined/>
                    </Button>
                </div>
            </div>
            <div className='pl-2'>
                <Select
                    value={selectedNote}
                    options={noteOptions}
                />
            </div>
            <div>
                <NoteEditor
                    mode={'edit'}
                    defaultSubject={selectedNote}
                />
            </div>
        </div>
    )
}