import React, { useEffect, useMemo, useState } from 'react'
import { TaskRowRenderer } from '../TaskRowRenderer'
import NewTaskForm from '../../../components/forms/NewTaskForm'
import { EventRowRenderer } from '../EventRowRenderer'
import NewEventForm from '../../../components/forms/NewEventForm'
import { NotesRowRenderer } from '../NotesRowRenderer'
import { NoteForm } from '../../../components/forms/NoteForm'
import { useSelector } from 'react-redux'
import './styles.css'
import widgetActions from '../../../redux/actions/widget'
import { store } from '../../../redux/store'


interface ProjectProps {
    selectedProject?: any
}

export default function ProjectRenderer(props: ProjectProps) {

    const [childTasks, setChildTasks] = useState<any>(null)
	const [childEvents, setChildEvents] = useState<any>(null)
	const [childNotes, setChildNotes] = useState<any>(null)
	const [newTaskFormOpen, setNewTaskFormOpen] = useState<boolean>(false)
	const [newEventFormOpen, setNewEventFormOpen] = useState<boolean>(false)
	const [newNoteFormOpen, setNewNoteFormOpen] = useState<boolean>(false)
    const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])
    const userEvents = useSelector((state: any) => state.events?.queryResult ?? [])
	const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])


    useMemo(() => { // filter for projects child tasks when userTasks updates
		if (props.selectedProject?._id && userTasks?.length) {
			let filtd = userTasks?.filter((tsk: any) => tsk?.parent == props.selectedProject?._id)
			setChildTasks(filtd)
		}
	}, [props.selectedProject, userTasks])

	useMemo(() => { // filter for projects child events when userEvents updates
		if (props.selectedProject?._id && userEvents?.length) {
			let filtd = userEvents?.filter((evt: any) => evt?.parent == props.selectedProject?._id)
			setChildEvents(filtd)
		}
	}, [props.selectedProject, userEvents])

	useMemo(() => { // filter for projects child notes when userNotes updates
		if (props.selectedProject?._id && userNotes?.length) {
			let filtd = userNotes?.filter((evt: any) => evt?.parent == props.selectedProject?._id)
			setChildNotes(filtd)
		}
	}, [props.selectedProject, userNotes])

    return (
        <div className='project-area'>
            <div className='project-section'>
                <div className='flex'>
                    <div className='bordered m-1 p-1 '>
                        <h5 className='project-section-title'>Title : </h5>
                        <h4> {props.selectedProject?.title}</h4>
                    </div>
                    <div className='bordered m-1 p-1 '>
                        <h5 className='project-section-title'>Category : </h5>
                        <h4>{props.selectedProject?.category}</h4>
                    </div>
                    <div className='bordered m-1 p-1 flex'>
                        <button onClick={() => store.dispatch(widgetActions.showProjectWidget({
                            editorType: 'edit',
                            activeProject: props.selectedProject,
                        }))}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
            <div className='project-section'>
                <div className='project-section-title'>
                    project description
                </div> 
                <span className='project-description'>{props.selectedProject?.description}</span>
            </div>
            <div className='project-section'>
                <div className='w-100'>
                    <div className='project-section-title'>Project Tasks</div>
                    <TaskRowRenderer
                        tasks={childTasks}
                    />
                </div>
                {
                    newTaskFormOpen ? (
                        <NewTaskForm
                            taskParent={props.selectedProject}
                            formOperation={'add'}
                            onFinishAction={() => setNewTaskFormOpen(false)}
                        />
                    ) : (
                        <button className='w-100 mt-1' onClick={() => setNewTaskFormOpen(true)}>
                            +
                        </button>
                    )
                }
                
            </div>
            <div className='project-section'>
                <div className='w-100'>
                    <div className='project-section-title'>Project Events</div>
                    <EventRowRenderer
                        events={childEvents}
                    />
                </div>
                {
                    newEventFormOpen ? (
                        <div>
                            <NewEventForm
                                eventParent={props.selectedProject}
                                formOperation={'add'}
                                onFinishAction={() => setNewEventFormOpen(false)}
                            />
                        </div>
                    ) : (
                        <button className='w-100 mt-1' onClick={() => setNewEventFormOpen(true)}>
                            +
                        </button>
                    )
                }
                
            </div>
            <div className='project-section'>
                <div className='w-100'>
                    <div className='project-section-title'>Project Notes</div>
                    <NotesRowRenderer
                        notes={childNotes}
                    />
                </div>
                {
                    newNoteFormOpen ? (
                        <NoteForm
                            noteParent={props.selectedProject}
                            onFinishAction={() => setNewNoteFormOpen(false)}
                        />
                    ) : (
                        <button className='w-100 mt-1' onClick={() => setNewNoteFormOpen(true)}>
                            +
                        </button>
                    )
                }
                
            </div>
        </div>
    )
}