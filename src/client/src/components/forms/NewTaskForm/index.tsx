import { UndoOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Select } from 'antd'
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
        priority: 'High',
        dueDate: null
    })
    const [form] = Form.useForm();


    useEffect(() => {
        setEditingSubject({
            category: props.taskParent?.category ? props.taskParent?.category :'General',
            priority: 'High',
            dueDate: null
        })
    }, [props.taskParent?.category])

    const onEditorSubjectChange = (value: any, fieldName: any) => {
        let inifields = {...editingSubject}
        inifields[fieldName] = value
        setEditingSubject(inifields)
    }

    const onFinish = (data:any) => {

        if (props.formOperation === 'edit') {
            store.dispatch(taskActions.update(editingSubject?.id, editingSubject))
        }

        if (props.formOperation !== 'edit') {
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
        } 
	}
    
    const onResetForm = () => {
        setEditingSubject({
            category: 'General',
            priority: 'High'
        })
        form.resetFields()
        props.setSelectedTask && props.setSelectedTask(null)
    }

    useEffect(() => { // update editorSubject when initial task changes
        if (props.initialTask) {
            setEditingSubject(props.initialTask)
            const workingObj = {...props.initialTask}
            workingObj['taskCreationTime'] = moment(workingObj?.taskCreationTime)
            workingObj['dueDate'] = moment(workingObj?.dueDate)
            form.setFieldsValue(workingObj)
        }
    }, [props.initialTask])

    return (
        <div className='w-100 task-form'>
            <Form 
                onFinish={onFinish}
                className='task-form'
                form={form}
            >
                <div className='row'>
                    <div className='input-container w-30'>
                        <Form.Item 
                            rules={[{ required: true }]} 
                            style={{all:'unset', width: '100%'}}
                            name={'title'}
                        >
                            <Input
                                placeholder='Task Title'
                                name="title"
                                type="text"
                                onChange={(e) => onEditorSubjectChange(e?.target?.value, 'title')}
                                value={editingSubject?.title}
                                className='mr-1'
                                id='task-title-input'
                            />  
                        </Form.Item>
					</div>
					<div className='input-container w-70'>
                        <Form.Item 
                            rules={[{ required: true }]} 
                            style={{all:'unset', width: '100%'}}
                            name={'description'}
                        >
                            <Input
                                name="description"
                                placeholder='Task Description'
                                type="text"
                                onChange={(e) => onEditorSubjectChange(e?.target?.value, 'description')}
                                value={editingSubject?.description}
                                className='mr-1'
                                id='task-description-input'
                            /> 
                        </Form.Item>
					</div>
                </div>
                <div className='row content-center'>
                    <div className='input-container w-30'>
                        <Form.Item 
                            rules={[{ required: true }]} 
                            style={{all:'unset', width: '100%'}}
                            name={'category'}
                        >
                            <Select 
                                placeholder="Select Category"
                                onChange={(value) => onEditorSubjectChange(value, 'category')}
                                value={editingSubject?.category}
                                id='task-category-select'
                                options={taskCategories}
                            >
                                
                            </Select>
                        </Form.Item>
					</div>
					<div className='input-container w-30'>
                        <Form.Item 
                            rules={[{ required: true }]} 
                            style={{all:'unset', width: '100%'}}
                            name={'priority'}
                        >
                            <Select 
                                placeholder="Select Priority"
                                onChange={(value) => onEditorSubjectChange(value, 'priority')}
                                id='task-priority-select'
                                options={priorities}
                            >
                            </Select>
                        </Form.Item>
					</div>
					<div className='input-container w-40'>
                        <Form.Item 
                            //rules={[{ required: true }]} 
                            style={{all:'unset', width: '100%'}}
                            name={'dueDate'}
                        >
                            <DatePicker
                                placeholder='Select Due Date'
                                popupClassName='datepicker-pop-up'
                                format="YYYY-MM-DD HH:mm:ss"
                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                use12Hours
                                onChange={(e: any) => onEditorSubjectChange(new Date(e).toISOString(), 'dueDate')}
                                value={moment(editingSubject?.dueDate)}
                                className='w-100 mr-4'
                                id='task-due-date-picker'
                            />
                        </Form.Item>
					</div>
                </div>
                <div className="flex jc-c ">
                    <div className='w-90 flex'>
                        <Button 
                            className="submit-evt m-1" 
                            //onClick={onFinish}
                            htmlType={'submit'}
                            id="submit-tsk"
                        >
                            {
                                props.formOperation == 'add'
                                ? 'Submit New'
                                : 'Submit Edit'
                            }
                        </Button>
                        <Button 
                            className="reset m-1" 
                            onClick={onResetForm}
                        >
                            <UndoOutlined/>
                        </Button>
                    </div>
                    
                </div>
            </Form>
        </div>
    )
}