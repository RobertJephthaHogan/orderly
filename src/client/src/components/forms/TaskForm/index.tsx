import { ObjectID } from 'bson'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { priorities } from '../../../data/priorities'
import { taskCategories } from '../../../data/taskCategories'
import taskActions from '../../../redux/actions/tasks'
import { store } from '../../../redux/store'
import './styles.css'


type Props = {
    initialTask?: any
    formOperation?: any
    taskParent?:any
    onFinishAction?: any
}

export const TaskForm : React.FC<Props> = ({
    initialTask,
    formOperation,
    taskParent,
    onFinishAction
}) => {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [editingSubject, setEditingSubject] = useState<any>({})
    const [categoryOptions, setCategoryOptions] = useState<any>()
    const [priorityOptions, setPriorityOptions] = useState<any>()


    const onEditorSubjectChange = (value: any, fieldName: any) => {
        let inifields = editingSubject
        inifields[fieldName] = value
        setEditingSubject(inifields)
    }


    const onFinish = (data:any) => {

        data.preventDefault()

        if (formOperation == 'add') {
            const dto = {
                id: new ObjectID().toString(),
                title: editingSubject?.title,
                description: editingSubject?.description,
                parent: taskParent ? taskParent : '',
                category: editingSubject?.category,
                priority: editingSubject?.priority,
                createdByUserId : currentUser._id,
                isCompleted: false,
                taskCreationTime: new Date().toJSON(),
                dueDate: editingSubject?.dueDate
            }
            store.dispatch(taskActions.add(dto))
            if (onFinishAction) {
                onFinishAction()
            }

        } else if (formOperation == 'edit') {
            store.dispatch(taskActions.update(editingSubject?.id, editingSubject))
        }
		
	}

    const onResetForm = () => {
        console.log('resetting form...')
    }


    const generateCategoryOptions = () => {
        if (!categoryOptions?.length) {
            const menu = taskCategories?.map((child: any) => {
                return (
                    <option value={child.label} key={child.label}>{child.label}</option>
                )
            })  || []
            setCategoryOptions(menu)
        }   
    }

    const generatePriorityOptions = () => {
        if (!priorityOptions?.length) {
            const menu = priorities?.map((child: any) => {
                return (
                    <option value={child.label} key={child.label}>{child.label}</option>
                )
            })  || []
            setPriorityOptions(menu)
        }   
    }

    useEffect(() => {
        generateCategoryOptions()
        generatePriorityOptions()
    })

    useEffect(() => {
        if (initialTask) {
            setEditingSubject(initialTask)
            let formTitle : any = document?.getElementById('task-form-title')
            let formDescription : any = document?.getElementById('task-form-description')
            let formPriority : any = document?.getElementById('task-form-priority')
            let formDueDate : any = document?.getElementById('task-form-dueDate')
            formTitle.value = initialTask?.title
            formDescription.value = initialTask?.description
            formPriority.value = initialTask?.priority
            formDueDate.value = initialTask?.dueDate
        }
    }, [initialTask])

    return (
        <div className='w-100'>
            <form 
                onSubmit={onFinish}
                className='task-form'
            >
                <div className='row'>
                    <div className='input-container w-30'>
                        <span className='input-label'>Task Title:</span>
						<input
							name="title"
							id="task-form-title"
							type="text"
							onChange={(e) => onEditorSubjectChange(e?.target?.value, 'title')}
							className='mr-1'
						/>  
					</div>
					<div className='input-container w-70'>
						<span className='input-label'>Task Description:</span>
						<input
							name="description"
							id="task-form-description"
							type="text"
							onChange={(e) => onEditorSubjectChange(e?.target?.value, 'description')}
							className='mr-1'
						/> 
					</div>
                </div>
                <div className='row content-center'>
                    <div className='input-container w-30'>
						<span className='input-label'>Task Category:</span>
						<select 
							name="category"
							id="task-form-category"
							onChange={(e) => onEditorSubjectChange(e?.target?.value, 'category')}
						>
							{categoryOptions}
						</select>
					</div>
					<div className='input-container w-30'>
						<span className='input-label'>Task Priority:</span>
						<select 
							name="priority"
                            placeholder='Priority'
							id="task-form-priority"
							onChange={(e) => onEditorSubjectChange(e?.target?.value, 'priority')}
						>
							{priorityOptions}
						</select>
					</div>
					<div className='input-container w-40'>
						<span className='input-label'>Task Due Date:</span>
						<input 
							type="datetime-local" 
							id="task-form-dueDate"
							name="dueDate"
							onChange={(e) => onEditorSubjectChange(e?.target?.value, 'dueDate')}
						/>
					</div>
                </div>
                <div className="flex">
                    <button className="submit-task" type="submit">
                        Submit
                    </button>
                    <button className='reset' type='reset' onClick={onResetForm}>
                        reset
                    </button>
                </div>
            </form>
        </div>
    )
}