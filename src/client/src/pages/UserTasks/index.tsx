import React, { useEffect, useState } from 'react'
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { useSelector } from 'react-redux';
import { groupByProperty } from '../../helpers';
import taskActions from '../../redux/actions/tasks';
import { store } from '../../redux/store';
import { TaskForm } from '../../components/forms/TaskForm';
import './styles.css'
import TaskMenuRender from '../../features/tasks/TaskMenu';
import NewTaskForm from '../../components/forms/NewTaskForm';
import { TaskRowRenderer } from '../../features/projects/TaskRowRenderer';
import TasksByTimelineMenu from '../../features/tasks/TasksByTimelineMenu';



export default function UserTasks() {

	const [sortedTasks, setSortedTasks] = useState<any>({})
	const [selectedCategory, setSelectedCategory] = useState<any>()
	const [selectedCategoryTasks, setSelectedCategoryTasks] = useState<any>()
	const [selectedTask, setSelectedTask] = useState<any>(null)
	const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])
	const currentUser = useSelector((state: any) => state.user?.data ?? [])


	useEffect(() => { // get tasks on mount
		store.dispatch(taskActions.setToDos(currentUser._id))
	}, [])

	useEffect(() => { // sort tasks when tasks update
		const st = groupByProperty(userTasks, 'category')
		const intTasks = Object.assign({All: userTasks}, {...st});
		setSortedTasks(intTasks)
	}, [userTasks])

	useEffect(() => {
		if (selectedCategory) {
			resetTaskForm()
			setSelectedTask(null)
			setSelectedCategoryTasks(selectedCategory?.[1])
		} else {
			setSelectedCategoryTasks(sortedTasks?.['General'])
		}
	}, [selectedCategory, sortedTasks])

	const resetTaskForm = () => {
		setSelectedTask(null)
	}

	const TaskCategoryArea = () => {
		return (
			<div 
				className='w-100 p-1'
				style={{
					backgroundColor: '#ffffff',
					border: '1px solid #dfdfdf',
				}}
			>
				<div className='w-100 flex p-1'>
					<div className='bordered p-1 '>
						<h5>Selected Category : {selectedCategory?.[0]}</h5>
					</div>
					<div className='bordered ml-1 p-1 '>
						<h5># tasks : {selectedCategoryTasks?.length}</h5>
					</div>
				</div>
				<div 
					className='bordered m-1 p-1 w-100 '
					style={{
						maxHeight: '500px',
						overflowY: 'auto'
					}}
				>
					<TaskRowRenderer
						tasks={selectedCategoryTasks}
						selectedTask={selectedTask}
						setSelectedTask={setSelectedTask}
					/>
				</div>
			</div>
		)
	}

	return (
		<div className='user-tasks-component'>
			<div className='top-bar-wrapper'>
				<div className='top-bar'>
					<NewTaskForm
						initialTask={selectedTask}
						formOperation={selectedTask?.id?.length ? 'edit' : 'add'}
						setSelectedTask={setSelectedTask}
					/>
				</div>
			</div>
			<div className='flex task-body-wrapper'>
				<div className='w-30'>
					<div className='p-1'>
						<TaskMenuRender
							sortedTasks={sortedTasks}
							setSelectedCategory={setSelectedCategory}
						/>
					</div>
					<div className='p-1'>
						<TasksByTimelineMenu
							setSelectedCategory={setSelectedCategory}
						/>
					</div>
				</div>
				<div className='w-70'>
					<TaskCategoryArea/>
				</div>
			</div>
		</div>
		
	)
}



