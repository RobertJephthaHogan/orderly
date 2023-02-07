




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
                <h5>{project?.[1]?.title}</h5>
            </div>
        )
    }) || []
    return <div className='mr-3'>{pmenu}</div>
}

export default ProjectMenuRender