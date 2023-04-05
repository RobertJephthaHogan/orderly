import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import projectActions from '../../redux/actions/project';
import { store } from '../../redux/store';
import { SelectCreator } from '../../components/inputs/SelectCreator';
import { ProjectEditor } from '../../features/projects/ProjectEditor';
import { ProjectsOverview } from './ProjectsOverview';
import './styles.css'

type Props = {
	unsortedProjects?: any
}

export const UserProjects: React.FC = () => {

	const [selectedLayout, setSelectedLayout] = useState<any>(1)
	const userProjects = useSelector((state: any) => state.projects?.queryResult ?? [])
	const currentUser = useSelector((state: any) => state.user?.data ?? [])


	useEffect(() => {
        store.dispatch(projectActions.setProjects(currentUser._id))
    }, [])


    return (
		<div className="outlet-container">
			<div className='projects-body'>
				<div className='tab-section'>
					<div className='tab-select'>
						<div 
							className={`tab-option ${selectedLayout === 1 ? 'aactive' : 'inactive' }`}
							onClick={() => setSelectedLayout(1)}
						>
							Projects Overview
						</div>
						<div 
							className={`tab-option ${selectedLayout === 4 ? 'aactive' : 'inactive' }`}
							onClick={() => setSelectedLayout(4)}
						>
							Project Editor
						</div>
					</div>
					<div className='tab-panel-area'>
						{
							selectedLayout === 1 && (
								<ProjectsOverview
									setSelectedLayout={setSelectedLayout}
									userProjects={userProjects}
								/>
							)
						}
						{
							selectedLayout === 4 && (
								<ProjectLayoutFour
									userProjects={userProjects}
									setSelectedLayout={setSelectedLayout}
								/>
							)
						}
					</div>	
				</div>
			</div>
		</div>
    );
};


type LayoutFourProps = {
	setSelectedLayout?: any
	userProjects?: any
}

const ProjectLayoutFour: React.FC<LayoutFourProps> = ({
	userProjects,
	setSelectedLayout
}) => {

	const [activeProject, setActiveProject] = useState<any>()
	const [editorType, setEditorType] = useState<any>()
	const [isOpen, setIsOpen] = useState<any>()


	const dispatchNewEditor = (et: any, projectId?: any) => {
		if (et === 'edit') {
			setEditorType('edit')
			setActiveProject(projectId)
			setIsOpen(true)
		} else if (et === 'new') {
			setEditorType('new')
			setActiveProject(false)
			setIsOpen(true)
		}
	}


	return (
		<div>
			<div className='body-wrapper'>
				<div className='projects-editor-wrapper'>
					<div className='row flex content-center'>
						<button 
							className='w-100'
							onClick={() => dispatchNewEditor('new')}
						>
							+
						</button>
					</div>
					<div className='row flex content-center'>
						or
					</div>
					<div className='row flex content-center'>
						<SelectCreator
							data={userProjects}
							title={'userProjects'}
							onSelect={(e: any) => dispatchNewEditor('edit', e?.target?.value)}
						/>
					</div>
					
				</div>
				{
					isOpen ? (
						<div className='w-100'>
							<ProjectEditor
								activeProject={activeProject}
								editorType={editorType}
								setSelectedLayout={setSelectedLayout}
							/>
						</div>
					) : null
				}
			</div>
		</div>
	)
}