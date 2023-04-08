import { ObjectID } from 'bson';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import noteActions from '../../redux/actions/notes';
import { store } from '../../redux/store';
import './styles.css'
import { Button, Empty } from 'antd';
import NotesMenu from './NotesMenu';

type Props = {
}

export const UserNotes: React.FC = () => {

	const currentUser = useSelector((state: any) => state.user?.data ?? [])
	const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])
	const [activeNote, setActiveNote] = useState<any>(null)
	const [activeNoteDate, setActiveNoteDate] = useState<any>(new Date().toJSON())

	useEffect(() => { // get notes on mount
        store.dispatch(noteActions.setNotes(currentUser._id))
    }, [])


    // useEffect(() => {
    //     let datesplit = activeNoteDate?.split('T')[0]
    //     let filtered = userNotes.filter( // filter userNotes for notes for active date
    //         (note: any) => (new Date(note?.dailyNoteForDate)?.toJSON().split('T')[0] == datesplit) && note.category == 'daily'
    //     )
        
    //     if (filtered?.length == 0) { // if there are no daily notes for active day found in filter, set activeEvent to null
    //         setActiveNote(null)
    //     } else { // if there is a daily note for today, set as first found
    //         setActiveNote(filtered?.[0])
    //     }
    // }, [activeNoteDate, userNotes])

	
	const createNoteForActiveDate = () => {
		const jsonDate = activeNoteDate
        const dto = {
            id: new ObjectID().toString(),
            title: `Note for ${jsonDate.split('T')[0]}`,
            category: 'daily',
            body: `Note for ${jsonDate.split('T')[0]}`,
            parent: '',
            createdByUserId : currentUser._id,
            noteCreationTime: new Date().toJSON(),
            dailyNoteForDate: jsonDate,
        }
        store.dispatch(noteActions.add(dto))
	}

    const createNewNote = () => {
        const dto = {
            id: new ObjectID().toString(),
            title: `New Note`,
            category: 'General',
            body: `New Note`,
            parent: '',
            createdByUserId : currentUser._id,
            noteCreationTime: new Date().toJSON(),
            dailyNoteForDate: activeNoteDate,
        }
        store.dispatch(noteActions.add(dto))
	}


    const onActiveDateChange = (value: any) => {
        setActiveNoteDate(new Date(value)?.toJSON())
    }


    const onNoteSelect = (note: any) => {
        setActiveNote(note)
        let noteDate = new Date(note?.dailyNoteForDate?.split('T')[0]).toJSON()
        setActiveNoteDate(noteDate)
    }


    const onNoteUpdate = (value: any, field: any) => {
        let workingObj = {...activeNote}
        workingObj[field] = value
        setActiveNote(workingObj)
    }


    const onSaveNote = () => {
        console.log('activeNote?.id', activeNote?.id)
        store.dispatch(noteActions.update(activeNote?.id, activeNote))
    }

    return (
		<div className='notes-body'>
			<div>
				<div className='body-wrapper'>
					<div className="w-100 flex pb-2">
						<Button 
							className="w-100"
							onClick={createNewNote}
						>
							+
						</Button>
					</div>
					<div className='body-content'>
						<NotesMenu
							onNoteSelect={onNoteSelect}
						/>
						
						<div className='notes-display-wrapper'>
							<div className='note-section flex'>
								{/* Viewing Daily Note For : {new Date(activeNoteDate)?.toLocaleDateString()} */}
								Viewing Daily Note For :
								<div className="pl-2">
									<input
										type='date'
										value={activeNoteDate.split('T')[0]}
										onChange={(e) => onActiveDateChange(e?.target?.value)}
									/>
								</div>
							</div>
							{
								activeNote != null ? (
									<div className='note-section'>
										<div className=" flex p-1">
											<div className="w-100">
												<input
													type='text'
													value={activeNote?.title}
													onChange={(e) => onNoteUpdate( e?.target?.value, 'title' )}
													id='daily-note-title-input'
													className='daily-note-title-input'
												/>
											</div>
											<div className="ml-1">
												<button
													onClick={onSaveNote}
												>
													save
												</button>
											</div>
										</div>
										<div className="p-1">
											<textarea
												value={activeNote?.body}
												onChange={(e) => onNoteUpdate( e?.target?.value, 'body' )}
												id='daily-note-body-input'
												className='daily-note-body-input'
											/>
										</div>
									</div>
								) : (
									<div>
										<Empty 
											image={Empty.PRESENTED_IMAGE_SIMPLE} 
											description={
												<span>
												There is no daily note for the selected day. <a onClick={() => createNoteForActiveDate()}>Create one?</a>
												</span>
											}
										/>
									</div>
								)
							}
							
						</div>
					</div>
				</div>
			</div>
		</div>
    );
};


