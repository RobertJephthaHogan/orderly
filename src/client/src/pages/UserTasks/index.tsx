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
		setSortedTasks(st)
	}, [userTasks])
	



	useEffect(() => {
		if (selectedCategory) {
			resetTaskForm()
			setSelectedTask(null)
			setSelectedCategoryTasks(sortedTasks?.[selectedCategory?.[0]])
			console.log('sortedTasks?.[selectedCategory?.[0]]' ,sortedTasks?.[selectedCategory?.[0]])
		} else {
			setSelectedCategoryTasks(sortedTasks?.['General'])
		}
	}, [selectedCategory, sortedTasks])



	const deleteUserTask = (id: any) => {
		store.dispatch(taskActions.delete(id))
	}


	const resetTaskForm = () => {
		setSelectedTask(null)
	}



	
	const TaskCategoryArea = () => {
		const TaskRenderer = () => {
			const items = selectedCategoryTasks?.map((task: any) => {
				const thisTaskActive = (task == selectedTask)
				return (
					<div 
						className={`flex space-between category-task ${thisTaskActive ? "active-task" : ""}`}
						onClick={() => setSelectedTask(task)}
						key={`task-${task?.id}`}
					>
						<div>
							<h5>{task.title}</h5>
						</div>
						<div>
							<button className='btn-task-complete'>
								<CheckOutlined/>
							</button>
							<button 
								className='btn-task-delete'
								onClick={() => deleteUserTask(task.id)}
							>
								<CloseOutlined/>
							</button>
						</div>
					</div>
				)
				
			}) || []
			return (
				<div>
					{items}
				</div>
			)
		}


		return (
			<div className='w-100 p-1'>
				<div className='w-100 flex p-1'>
					<div className='bordered p-1 '>
						<h5>Selected Category : {selectedCategory?.[0]}</h5>
					</div>
					<div className='bordered ml-1 p-1 '>
						<h5># tasks : {selectedCategoryTasks?.length}</h5>
					</div>
				</div>
				<div className='bordered m-1 p-1 w-100 '>
					<TaskRenderer/>
				</div>
			</div>
		)
	}

	return (
		<div>
			<div className='top-bar-wrapper'>
				{/* <div className='top-bar'>
					<TaskForm
						initialTask={selectedTask}
						formOperation={selectedTask?.id?.length ? 'edit' : 'add'}
					/>
				</div> */}
				<div className='top-bar p-1'>
					<NewTaskForm
						initialTask={selectedTask}
						formOperation={selectedTask?.id?.length ? 'edit' : 'add'}
						setSelectedTask={setSelectedTask}
					/>
				</div>
			</div>
			<div className='flex task-body-wrapper'>
				<div className='w-30'>
					<div className='task-menu-area'>
						<TaskMenuRender
							sortedTasks={sortedTasks}
							setSelectedCategory={setSelectedCategory}
						/>
					</div>
					
				</div>
				<div className='w-70'>
					<div className='task-categories-area'>
						<TaskCategoryArea/>
					</div>
				</div>
			</div>
		</div>
		
	)
}



