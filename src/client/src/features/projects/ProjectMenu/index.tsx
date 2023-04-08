import React from 'react'
import './styles.css'


type Props = {
    userProjects: any
    selectProject: any
}



const ProjectMenuRender : React.FC<Props> = ({
    userProjects,
    selectProject
}) => {

    const pmenu = Object.entries(userProjects)?.map((project: any) => {
        return (
            <div 
                className='flex w-100 brdr-b pt-1 pmenu-item'
                onClick={() => selectProject(project)}
                key={`pm-${project?.[1]?._id}`}
            >
                <h5 className='ml-2'>{project?.[1]?.title}</h5>
            </div>
        )
    }) || []

    return (
        <div className='projects-menu'>
            <div className='pl-2 pt-2'>
                <h4>Projects</h4>
            </div>
            <div className='divider'/>
            <div className=''>
                <div className=''>
                    {pmenu}
                </div>
            </div>
        </div>
    )
}

export default ProjectMenuRender