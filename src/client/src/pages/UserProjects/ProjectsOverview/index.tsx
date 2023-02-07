import React, { useEffect } from 'react'
import { useState } from "react"
import { useSelector } from 'react-redux'
import eventActions from '../../../redux/actions/event'
import noteActions from '../../../redux/actions/notes'
import taskActions from '../../../redux/actions/tasks'
import { store } from '../../../redux/store'
import { EventForm } from '../../../components/forms/EventForm'
import { EventRowRenderer } from '../../../features/projects/EventRowRenderer'
import { NoteForm } from '../../../components/forms/NoteForm'
import { NotesRowRenderer } from '../../../features/projects/NotesRowRenderer'
import { TaskForm } from '../../../components/forms/TaskForm'
import { TaskRowRenderer } from '../../../features/projects/TaskRowRenderer'
import './styles.css'
import ProjectMenuRender from '../../../features/projects/ProjectMenu'


type ProjectsOverviewProps = {
	setSelectedLayout?: any
	userProjects?: any
}

export const ProjectsOverview: React.FC<ProjectsOverviewProps> = ({
	setSelectedLayout,
	userProjects
}) => {

	const [selectedProject, setSelectedProject] = useState<any>(null)
	const [childTasks, setChildTasks] = useState<any>(null)
	const [childEvents, setChildEvents] = useState<any>(null)
	const [childNotes, setChildNotes] = useState<any>(null)
	const [newTaskFormOpen, setNewTaskFormOpen] = useState<boolean>(false)
	const [newEventFormOpen, setNewEventFormOpen] = useState<boolean>(false)
	const [newNoteFormOpen, setNewNoteFormOpen] = useState<boolean>(false)
	const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])
    const userEvents = useSelector((state: any) => state.events?.queryResult ?? [])
	const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])


	const selectProject = (project: any) => {
		console.log(project?.[1])
		setSelectedProject(project?.[1])
	}


	useEffect(() => { // filter for projects child tasks when userTasks updates
		if (selectedProject?._id && userTasks?.length) {
			let filtd = userTasks?.filter((tsk: any) => tsk?.parent == selectedProject?._id)
			setChildTasks(filtd)
		}
	}, [selectedProject, userTasks])


	useEffect(() => { // filter for projects child events when userEvents updates
		if (selectedProject?._id && userEvents?.length) {
			let filtd = userEvents?.filter((evt: any) => evt?.parent == selectedProject?._id)
			setChildEvents(filtd)
		}
	}, [selectedProject, userEvents])


	useEffect(() => { // filter for projects child notes when userNotes updates
		if (selectedProject?._id && userNotes?.length) {
			let filtd = userNotes?.filter((evt: any) => evt?.parent == selectedProject?._id)
			setChildNotes(filtd)
		}
	}, [selectedProject, userNotes])


	useEffect(() => {
		store.dispatch(taskActions.setToDos(store.getState()?.user?.data?._id))
        store.dispatch(eventActions.setEvents(store.getState()?.user?.data?._id))
		store.dispatch(noteActions.setNotes(store.getState()?.user?.data?._id))
		
		if (!selectedProject) {
			selectProject(Object.entries(userProjects)[0])
		}

	}, [])


	const ProjectAreaRenderer = () => {

		return (
			<div className='project-area'>
				<div className='project-section'>
					<div className='flex'>
						<div className='bordered m-1 p-1 '>
							<h5 className='project-section-title'>Title : </h5>
							<h4> {selectedProject?.title}</h4>
						</div>
						<div className='bordered m-1 p-1 '>
							<h5 className='project-section-title'>Category : </h5>
							<h4>{selectedProject?.category}</h4>
						</div>
						<div className='bordered m-1 p-1 flex'>
							<button
								onClick={() => setSelectedLayout(4)}
							>
								Edit
							</button>
						</div>
					</div>
				</div>
				<div className='project-section'>
					<div className='project-section-title'>
						project description
					</div> 
					<span className='project-description'>{selectedProject?.description}</span>
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
							<TaskForm
								taskParent={selectedProject?._id}
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
							<EventForm
								eventParent={selectedProject?._id}
								formOperation={'add'}
								onFinishAction={() => setNewEventFormOpen(false)}
							/>
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
								noteParent={selectedProject}
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

	return (
		<div>
			{/* <div className='top-bar-wrapper'>
				<div className='top-bar flex'>
					<div className='m-1 p-1 bordered w-100'>
						# Projects : {userProjects?.length}
					</div>
					<div className='m-1 p-1 bordered w-100'>
						# Projects : {userProjects?.length}
					</div>
					<div className='m-1 p-1 bordered w-100'>
						# Projects : {userProjects?.length}
					</div>
					<div className='m-1 p-1 bordered w-100'>
						# Projects : {userProjects?.length}
					</div>
				</div>
			</div> */}
			<div className='body-wrapper'>
				<div className='body-content'>
					<div className='projects-menu-wrapper'>
						<div className='pl-2 pt-2'>
							<h4>Projects</h4>
						</div>
						<div className='divider'/>
						<div className='pl-2 pt-2'>
							{ userProjects && (
								<ProjectMenuRender
									userProjects={userProjects}
									selectProject={selectProject}
								/>
							)}
						</div>
					</div>
					<div className='projects-display-wrapper'>
						<ProjectAreaRenderer/>
					</div>
				</div>
			</div>
		</div>
	)
}
