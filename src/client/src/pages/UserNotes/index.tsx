import { ObjectID } from 'bson';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { groupByProperty } from '../../helpers';
import noteActions from '../../redux/actions/notes';
import { store } from '../../redux/store';
import { noteService } from '../../services/note.service';
import { DailyNotes } from './DailyNotes';
import { NotesByCategory } from './NotesByCategory';
import './styles.css'

type Props = {
}

export const UserNotes: React.FC = () => {

	const currentUser = useSelector((state: any) => state.user?.data ?? [])
	const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])
	const [selectedLayout, setSelectedLayout] = useState<any>(1)

	useEffect(() => { // get notes on mount
        store.dispatch(noteActions.setNotes(currentUser._id))
    }, [])

    return (
		<div className="fill-window-height">
			<div className='notes-top-bar'>
				<div className='banner'>
				Top Bar
				</div>
			</div>
			<div className='divider'></div>
			<div className='notes-body'>
				<div className='tab-section'>
					<div className='tab-select'>
						<div 
							className={`tab-option ${selectedLayout === 1 ? 'aactive' : 'inactive' }`}
							onClick={() => setSelectedLayout(1)}
						>
							Daily Notes
						</div>
						<div 
							className={`tab-option ${selectedLayout === 2 ? 'aactive' : 'inactive' }`}
							onClick={() => setSelectedLayout(2)}
						>
							Notes Categories
						</div>
					</div>
					<div className='tab-panel-area'>
						{
							selectedLayout === 1 && (
								<DailyNotes />
							)
						}
						{
							selectedLayout === 2 && (
								<NotesByCategory/>
							)
						}
					</div>	
				</div>
			</div>
		</div>
    );
};


