import { ObjectID } from 'bson';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { groupByProperty } from '../../helpers';
import noteActions from '../../redux/actions/notes';
import { store } from '../../redux/store';
import { noteService } from '../../services/note.service';
import { NotesOverview } from './NotesOverview';
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
			<div className='notes-body'>
				<NotesOverview />
			</div>
		</div>
    );
};


