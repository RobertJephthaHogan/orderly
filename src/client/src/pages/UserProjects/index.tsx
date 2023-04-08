import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import eventActions from '../../redux/actions/event'
import noteActions from '../../redux/actions/notes'
import taskActions from '../../redux/actions/tasks'
import projectActions from '../../redux/actions/project';
import { store } from '../../redux/store';
import { Button } from 'antd';
import widgetActions from '../../redux/actions/widget';
import ProjectMenuRender from '../../features/projects/ProjectMenu';
import ProjectRenderer from './ProjectRenderer';
import './styles.css'


type Props = {
	unsortedProjects?: any
}

export const UserProjects: React.FC = () => {

	const userProjects = useSelector((state: any) => state.projects?.queryResult ?? [])
	const currentUser = useSelector((state: any) => state.user?.data ?? [])
	const [selectedProject, setSelectedProject] = useState<any>(null)


	useEffect(() => {
        store.dispatch(projectActions.setProjects(currentUser._id))
    }, [])

	const selectProject = (project: any) => {
		console.log(project?.[1])
		setSelectedProject(project?.[1])
	}

	useEffect(() => {
		store.dispatch(taskActions.setToDos(store.getState()?.user?.data?._id))
        store.dispatch(eventActions.setEvents(store.getState()?.user?.data?._id))
		store.dispatch(noteActions.setNotes(store.getState()?.user?.data?._id))
		
		if (!selectedProject) {
			selectProject(Object.entries(userProjects)[0])
		}

	}, [])


    return (
		<div>
			<div className='body-wrapper'>
				<div className='mb-1 w-100'>
					<Button 
						className='w-100'
						onClick={() => store.dispatch(widgetActions.showProjectWidget())}
					> 
						+ 
					</Button>
				</div>
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
						<ProjectRenderer
							selectedProject={selectedProject}
						/>
					</div>
				</div>
			</div>
		</div>
    );
};

