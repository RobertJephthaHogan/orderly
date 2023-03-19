import { UndoOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input } from 'antd'
import { ObjectID } from 'bson'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { priorities } from '../../../data/priorities'
import { taskCategories } from '../../../data/taskCategories'
import taskActions from '../../../redux/actions/tasks'
import { store } from '../../../redux/store'
import './styles.css'



interface TaskFormProps {
    initialTask?: any
    formOperation?: any
    taskParent?:any
    onFinishAction?: any
    setSelectedTask?: any
}

export default function NewTaskForm(props: TaskFormProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [editingSubject, setEditingSubject] = useState<any>({
        category: 'General',
        priority: 'High'
    })
    const [categoryOptions, setCategoryOptions] = useState<any>()
    const [priorityOptions, setPriorityOptions] = useState<any>()

    useEffect(() => {
        setEditingSubject({
            category: props.taskParent?.category ? props.taskParent?.category :'General',
            priority: 'High'
        })
    }, [props.taskParent?.category])

    const onEditorSubjectChange = (value: any, fieldName: any) => {
        let inifields = {...editingSubject}
        inifields[fieldName] = value
        console.log('inifields', inifields)
        setEditingSubject(inifields)
    }

    const onFinish = (data:any) => {

        data.preventDefault()

        if (props.formOperation == 'add') {
            const dto = {
                id: new ObjectID().toString(),
                title: editingSubject?.title,
                description: editingSubject?.description,
                parent: props.taskParent?._id ? props.taskParent?._id : '',
                category: editingSubject?.category,
                priority: editingSubject?.priority,
                createdByUserId : currentUser._id,
                isCompleted: false,
                taskCreationTime: new Date().toJSON(),
                dueDate: editingSubject?.dueDate
            }
            console.log('dto', dto)
            store.dispatch(taskActions.add(dto))
            if (props.onFinishAction) {
                props.onFinishAction()
                onResetForm()
            }

        } else if (props.formOperation == 'edit') {
            store.dispatch(taskActions.update(editingSubject?.id, editingSubject))
        }
		
	}

    
    const onResetForm = () => {
        setEditingSubject({
            category: 'General',
            priority: 'High'
        })
        props.setSelectedTask && props.setSelectedTask(null)
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

    useEffect(() => { // update editorSubject when initial task changes
        if (props.initialTask) {
            setEditingSubject(props.initialTask)
        }
    }, [props.initialTask])

    return (
        <div className='w-100'>
            <form 
                onSubmit={onFinish}
                className='task-form'
            >
                <div className='row'>
                    <div className='input-container w-30'>
                        <span className='input-label'>Task Title:</span>
						<Input
							name="title"
							type="text"
							onChange={(e) => onEditorSubjectChange(e?.target?.value, 'title')}
                            value={editingSubject?.title}
							className='mr-1'
						/>  
					</div>
					<div className='input-container w-70'>
						<span className='input-label'>Task Description:</span>
						<Input
							name="description"
							type="text"
							onChange={(e) => onEditorSubjectChange(e?.target?.value, 'description')}
                            value={editingSubject?.description}
							className='mr-1'
						/> 
					</div>
                </div>
                <div className='row content-center'>
                    <div className='input-container w-30'>
						<span className='input-label'>Task Category:</span>
						<select 
							name="category"
							onChange={(e) => onEditorSubjectChange(e?.target?.value, 'category')}
                            value={editingSubject?.category}
						>
							{categoryOptions}
						</select>
					</div>
					<div className='input-container w-30'>
						<span className='input-label'>Task Priority:</span>
						<select 
							name="priority"
                            placeholder='Priority'
							onChange={(e) => onEditorSubjectChange(e?.target?.value, 'priority')}
                            //value={editingSubject?.priority}
						>
							{priorityOptions}
						</select>
					</div>
					<div className='input-container w-40'>
						<span className='input-label'>Task Due Date:</span>
                        <DatePicker
                            format="YYYY-MM-DD HH:mm:ss"
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            use12Hours
                            onChange={(e: any) => onEditorSubjectChange(new Date(e).toISOString(), 'dueDate')}
                            value={moment(editingSubject?.dueDate)}
                            status={!editingSubject?.dueDate ? 'error' : ''}
                            className='w-100 mr-4'
                        />
					</div>
                </div>
                <div className="flex">
                    <div className='w-90 flex'>
                        <Button 
                            className="submit-evt m-1" 
                            onClick={onFinish}
                        >
                            {
                                props.formOperation == 'add'
                                ? 'Submit New'
                                : 'Submit Edit'
                            }
                        </Button>
                    </div>
                    <div className='w-10 flex'>
                            <Button 
                                className="reset m-1" 
                                onClick={onResetForm}
                            >
                                <UndoOutlined/>
                            </Button>
                        </div>
                </div>
            </form>
        </div>
    )
}