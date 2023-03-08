import React from 'react'
import { useSelector } from 'react-redux'



type Props = {
    sortedTasks: any
    setSelectedCategory: any
}


const TaskMenuRender : React.FC<Props> = ({
    sortedTasks,
    setSelectedCategory
}) => {

    const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])

    console.log(userTasks)

    const intTasks = Object.assign({All: userTasks}, {...sortedTasks});

    const taskCategoriesMenu = Object.entries(intTasks)?.map((project: any) => {
        return (
            <div 
                className='flex w-100 brdr-b pt-1 pmenu-item'
                data-value={project}
                onClick={() => setSelectedCategory(project)}
                key={`${project?.[0]}`}
            >
                <h5>{project?.[0]}</h5><h5 className='ml-1'>{`(${project?.[1]?.length})`}</h5>
            </div>
        )
    }) || []


    return (
        <div className='mr-3'>
            {taskCategoriesMenu}
        </div>
    )
}

export default TaskMenuRender