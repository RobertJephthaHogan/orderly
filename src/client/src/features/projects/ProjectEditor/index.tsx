import { ObjectID } from 'bson'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { priorities } from '../../../data/priorities'
import { projectCategories } from '../../../data/projectCategories'
import { projectService } from '../../../services'



type EditorProps = {
    activeProject?: any
    editorType?: any
    setSelectedLayout?: any
}

export const ProjectEditor : React.FC<EditorProps> = ({
    activeProject,
    editorType,
    setSelectedLayout
}) => {

    const [projectData, setProjectData] = useState<any>({
        "id": "",
        "title": "",
        "description": "",
        "category": "",
        "priority": "",
        "createdByUserId": "",
        "tasks": [],
        "events": [],
        "isCompleted": "false",
        "taskCreationTime": "",
        "stage": "planning",
        "workItems": {},
        "dueDate": "",
    })
    const [projectCategoryOptions, setProjectCategoryOptions] = useState<any>()
    const [projectPriorityOptions, setProjectPriorityOptions] = useState<any>()
    const currentUser = useSelector((state: any) => state.user?.data ?? [])


    const generateCategoryOptions = () => {
        if (!projectCategoryOptions?.length) {
            const menu = projectCategories?.map((child: any) => {
                return (
                    <option 
                        value={child.label}
                        key={child.label}
                    >
                        {child.label}
                    </option>
                )
            })  || []
            setProjectCategoryOptions(menu)
        }   
    }

    const generatePriorityOptions = () => {
        if (!projectPriorityOptions?.length) {
            const menu = priorities?.map((child: any) => {
                return (
                    <option 
                        value={child.label}
                        key={child.label}
                    >
                        {child.label}
                    </option>
                )
            })  || []
            setProjectPriorityOptions(menu)
        }   
    }

    useEffect(() => {
        generateCategoryOptions()
        generatePriorityOptions()
    })

    useEffect(() => {
        if (editorType === 'new') {

        } else if (editorType === 'edit') {
            projectService.getAProject(activeProject?._id).then((resp: any) => {
                resp = resp?.data
                setProjectData(resp?.data)
                const projectTitleField : any = document?.getElementById('title-field')
                const projectDescriptionField : any = document?.getElementById('description-field')
                const projectCategoryField : any = document?.getElementById('category-select')
                const projectPriorityField : any = document?.getElementById('priority-select')
                projectTitleField.value = resp?.data?.title
                projectDescriptionField.value = resp?.data?.description
                projectCategoryField.value = resp?.data?.category
                projectPriorityField.value = resp?.data?.priority
            })
        }
    }, [editorType])


    const onTitleChange = (value: any) => {
        let workingObj = projectData
        workingObj.title = value?.target?.value
        setProjectData(workingObj)
    }

    const onDescriptionChange = (value: any) => {
        let workingObj = projectData
        workingObj.description = value?.target?.value
        setProjectData(workingObj)
    }

    const onCategoryChange = (value: any) => {
        let workingObj = projectData
        workingObj.category = value?.target?.value
        setProjectData(workingObj)
    }

    const onPriorityChange = (value: any) => {
        let workingObj = projectData
        workingObj.priority = value?.target?.value
        setProjectData(workingObj)
    }

    const onDueDateChange = (value: any) => {
        let workingObj = projectData
        workingObj.dueDate = value?.target?.value
        setProjectData(workingObj)
    }

    const onFinish = () => {
        if (editorType == 'new') {
            const generated_id  = new ObjectID();
            const newProjectObject = {
                "_id": generated_id.toString(),
                "title": projectData.title,
                "description": projectData.description,
                "category": projectData.category,
                "priority": projectData.priority,
                "createdByUserId": currentUser?._id,
                "tasks": [],
                "events": [],
                "isCompleted": false,
                "taskCreationTime": new Date().toJSON(),
                "stage": 'planning',
                "workItems": {},
                "dueDate": projectData.dueDate
            }
            setProjectData(newProjectObject)

            projectService.createProject(newProjectObject).then((resp: any) => {
                console.log('creating new project:', resp)
            })

        } else if (editorType == 'edit') {
            const existingProjectData = projectData
            projectService.updateProject(existingProjectData._id, existingProjectData).then((resp: any) => {
                console.log('updated project:', resp)
            })
        }
        
    }

    const onDelete = () => {
        projectService.deleteProject(projectData?._id).then((resp: any) => {
            console.log('deleted project:', resp)
        })
        setSelectedLayout(1)
    }



    return (
        <div className='w-90 '>
            <div className='project-input-row'>
                Project Title:
                <input
                    type='text'
                    placeholder='Title'
                    id='title-field'
                    onChange={onTitleChange}
                />
            </div>
            <div className='project-input-row'>
                Project Description:
                <input
                    type='text'
                    placeholder='Description'
                    id='description-field'
                    onChange={onDescriptionChange}
                />
            </div>
            <div className='project-input-row'>
                Project Category:
                <select 
                    name={'category'}
                    id='category-select'
                    onChange={onCategoryChange}
                    data-select
                >
                    {projectCategoryOptions}
                </select>
            </div>
            <div className='project-input-row'>
                Project Priority:
                <select 
                    name={'priority'}
                    id='priority-select'
                    onChange={onPriorityChange}
                    data-select
                >
                    {projectPriorityOptions}
                </select>
            </div>
            {
                editorType === 'edit' && (
                    <div className='projects-editor-tasks'>
                        tasks div
                    </div>
                )
            }
            {
                editorType === 'edit'  && (
                    <div className='projects-editor-events'>
                        events div
                    </div>
                )
            }
            <div className='project-input-row'>
                Project Due Date:
                <input 
                    type="datetime-local" 
                    id="projectDate" 
                    name="projectDate"
                    onChange={onDueDateChange}
                ></input>
            </div>
            
            <div className='flex space-between'>
                <button
                    onClick={onFinish}
                >
                    Submit
                </button>
                {
                    editorType === 'edit'  && (
                        <button
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                    )
                }
            </div>
        </div>
    )
}