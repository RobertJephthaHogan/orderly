import { Empty } from "antd"
import { ObjectID } from "bson"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import noteActions from "../../../redux/actions/notes"
import { store } from "../../../redux/store"
import { noteService } from "../../../services/note.service"
import './styles.css'




type Props = {

}

export const DailyNotes: React.FC<Props> = ({

}) => {

	const currentUser = useSelector((state: any) => state.user?.data ?? [])
	const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])
	const [activeNote, setActiveNote] = useState<any>()
    const [initialAN, setInitialAN] = useState<any>()
	const [activeNoteDate, setActiveNoteDate] = useState<any>(new Date().toJSON())



    useEffect(() => { // get notes on mount
        store.dispatch(noteActions.setNotes(currentUser._id))
    }, [])


    useEffect(() => {
        let datesplit = activeNoteDate?.split('T')[0]
        let filtered = userNotes.filter( // filter userNotes for notes for active date
            (note: any) => (new Date(note?.dailyNoteForDate)?.toJSON().split('T')[0] == datesplit) && note.category == 'daily'
        )
        
        if (filtered?.length == 0) { // if there are no daily notes for active day found in filter, set activeEvent to null
            setActiveNote(null)
        } else { // if there is a daily note for today, set as first found
            setActiveNote(filtered?.[0])
            setInitialAN(filtered?.[0])
        }
    }, [activeNoteDate, userNotes])

	
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


    const onActiveDateChange = (value: any) => {
        setActiveNoteDate(new Date(value)?.toJSON())
    }


    const onNoteSelect = (note: any) => {
        setActiveNote(note)
        let trying = new Date(note?.dailyNoteForDate?.split('T')[0]).toJSON()
        setActiveNoteDate(trying)
    }


    const onNoteUpdate = (value: any, field: any) => {
        let workingObj = {...activeNote}
        workingObj[field] = value
        setActiveNote(workingObj)
    }


    const onSaveNote = () => {
        store.dispatch(noteActions.update(activeNote?.id, activeNote))
    }


	return (
		<div>
			<div className='top-bar-wrapper'>
				<div className='top-bar'>
					Notes Component Top Bar
				</div>
			</div>
			<div className='body-wrapper'>
				<div className='body-content'>
					<div className='notes-menu-wrapper'>
						<div className='pl-2 pt-2'>
							<h4>Notes</h4>
						</div>
						<div className='divider'/>
						<div className='pl-2 pt-2'>
                            {
                                userNotes?.map((item:any) => {
                                    return (
                                        <div 
                                            onClick={() => onNoteSelect(item)}
                                            key={`${item?.id}`}
                                            className='daily-note-menu-item'
                                        >
                                            {item?.title}
                                        </div>
                                    )
                                }) || []
                            }
						</div>
					</div>
                    
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
	)
}

