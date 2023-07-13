import { PlusOutlined } from '@ant-design/icons'
import { Button, Empty, Select } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import widgetActions from '../../../redux/actions/widget'
import { store } from '../../../redux/store'
import noteActions from '../../../redux/actions/notes'
import NoteEditor from '../NoteEditor'
import { ObjectID } from 'bson'




interface NoteCardProps {
    selectedDate?: any 
}

export default function NoteCard(props: NoteCardProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
	const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])
    const [selectedDay, setSelectedDay] = useState<any>(new Date())
    const [notesForSelectedDate, setNotesForSelectedDate] = useState<any>()
    const [noteOptions, setNoteOptions] = useState<any>()
    const [selectedNote, setSelectedNote] = useState<any>()

    useEffect(() => {
        if (props.selectedDate) {
            setSelectedDay(props.selectedDate)
        }
    }, [props?.selectedDate])

    useEffect(() => {
        store.dispatch(noteActions.setNotes(currentUser?._id))
    }, [currentUser])

    function datesMatch(date1: any, date2: any) {
        return date1.getFullYear() === date2.getFullYear() 
          && date1.getMonth() === date2.getMonth() 
          && date1.getDate() === date2.getDate();
    }
    
    useEffect(() => {
        const currentNotes = userNotes?.filter((note: any) => {
            return datesMatch(new Date(note?.dailyNoteForDate), selectedDay)
        })
        setNotesForSelectedDate(currentNotes)
    }, [userNotes, props?.selectedDate, selectedDay])


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

    console.log('selectedNote', selectedNote)

    const selectNote = (value: any) => {
        setSelectedNote(value)
    }

    const createNewNote = () => {
        const jsonDate = selectedDay.toJSON()

        const dto = {
            id: new ObjectID().toString(),
            title: `Note for ${jsonDate.split('T')[0]}`,
            category: 'General',
            body: `Note for ${jsonDate.split('T')[0]}`,
            parent: '',
            createdByUserId : currentUser._id,
            noteCreationTime: new Date().toJSON(),
            dailyNoteForDate: selectedDay,
        }
        store.dispatch(noteActions.add(dto))
	}

    return (
        <div>
            <div className='flex jc-sb p-2'>
                <div>
                    <h5>Notes:</h5>
                </div>
                <div>
                    <Button onClick={() => createNewNote()} size='small'>
                        <PlusOutlined/>
                    </Button>
                </div>
            </div>
            <div className='divider mb-2'/>
            {
                !noteOptions?.length
                ? (
                    <div className='mb-3'>
                        <Empty
                            description={
                                <span>
                                  You do not have any notes for this day, create one?
                                </span>
                              }
                        />
                    </div>
                )
                :  (
                    <div>
                        <div className='pl-2'>
                            <Select
                                value={selectedNote}
                                options={noteOptions}
                                dropdownMatchSelectWidth={false}
                                onChange={(value) => selectNote(value)}
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
            
        </div>
    )
}