import React from 'react'
import { useSelector } from 'react-redux'



type Props = {
    sortedTasks: any
    setSelectedCategory: any
}


const TaskMenuRender : React.FC<Props> = ({
    sortedTasks,
    setSelectedCategory,
}) => {

    const taskCategoriesMenu = Object.entries(sortedTasks)?.map((project: any) => {
        return (
            <div 
                className='flex w-100 brdr-b pt-1 pmenu-item'
                data-value={project}
                onClick={() => setSelectedCategory(project)}
                key={`${project?.[0]}`}
            >
                <h5 className='ml-2'>{project?.[0]}</h5><h5 className='ml-1'>{`(${project?.[1]?.length})`}</h5>
            </div>
        )
    }) || []


    return (
        <div 
            style={{
                backgroundColor: '#ffffff',
                border: '1px solid #dfdfdf'
            }}
        >
            <div>
                <h4 className='p-1 m-0'>Tasks By Category</h4>
            </div>
            <div className='divider' />
            <div>
                {taskCategoriesMenu}
            </div>
        </div>
    )
}

export default TaskMenuRender