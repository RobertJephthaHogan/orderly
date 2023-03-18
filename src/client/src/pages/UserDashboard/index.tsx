import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { groupByProperty } from '../../helpers'
import { store } from '../../redux/store'
import eventActions from "../../redux/actions/event"
import noteActions from "../../redux/actions/notes"
import projectActions from "../../redux/actions/project"
import taskActions from "../../redux/actions/tasks"
import './styles.css'
import { useNavigate } from 'react-router-dom'




export default function UserDashboard() {
    
    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])
    const userEvents = useSelector((state: any) => state.events?.queryResult ?? [])
	const userProjects = useSelector((state: any) => state.projects?.queryResult ?? [])
	const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])
    const [sortedTasks, setSortedTasks] = useState<any>({})
    const [sortedEvents, setSortedEvents] = useState<any>({})
    const [sortedProjects, setSortedProjects] = useState<any>({})
    const [sortedNotes, setSortedNotes] = useState<any>({})
    const navigate = useNavigate()

    useEffect(() => {
        store.dispatch(taskActions.setToDos(currentUser?._id))
        store.dispatch(eventActions.setEvents(currentUser?._id))
        store.dispatch(projectActions.setProjects(currentUser?._id))
        store.dispatch(noteActions.setNotes(currentUser?._id))
    }, [])

    useEffect(() => { // sort tasks when tasks update
		const st = groupByProperty(userTasks, 'category')
		const intTasks = Object.assign({All: userTasks}, {...st});
		setSortedTasks(intTasks)
	}, [userTasks])

    useEffect(() => { // sort events when events update
		const se = groupByProperty(userEvents, 'category')
		const intEvts = Object.assign({All: userEvents}, {...se});
		setSortedEvents(intEvts)
	}, [userEvents])

    useEffect(() => { // sort projects when projects update
		const sp = groupByProperty(userProjects, 'category')
		const intProjects = Object.assign({All: userProjects}, {...sp});
		setSortedProjects(intProjects)
	}, [userProjects])

    useEffect(() => { // sort notes when notes update
		const sn = groupByProperty(userNotes, 'category')
		const intNotes = Object.assign({All: userNotes}, {...sn});
		setSortedNotes(intNotes)
	}, [userNotes])

    const dateFormatOptions : any= {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return (
        <div className="user-dashboard">
            <div className="dashboard-overview">
                <div className="overview-card">
                    
                    <h3>Welcome back, {currentUser?.firstName}!</h3>
                    <h4>{new Date().toLocaleDateString("en-US", dateFormatOptions)}</h4>
                </div>
            </div>
            <div className="dashboard-body">
                <div className='row'>
                    <div className='dash-card'>
                        <div className='pl-3 pr-3 flex fdc hcp' onClick={() => navigate('/tasks')}>
                            <div className='m-auto'>
                                <div className='flex jc-c'>
                                    <span>You Have</span>
                                </div>
                                <div  className='flex jc-c'>
                                    <span>{userTasks?.length} Tasks</span>
                                </div>
                            </div>
                        </div>
                        <div className='v-divider'/>
                        <div 
                            style={{
                                margin: 'auto 0px'
                            }}
                        >
                            <CategoryRender groupedCategories={sortedTasks}/>
                        </div>
                    </div>
                    <div className='dash-card'>
                        <div className='pl-3 pr-3 flex fdc hcp' onClick={() => navigate('/events')}>
                            <div className='m-auto'>
                                <div className='flex jc-c'>
                                    <span>You Have</span>
                                </div>
                                <div  className='flex jc-c'>
                                    <span>{userEvents?.length} Events</span>
                                </div>
                            </div>
                        </div>
                        <div className='v-divider'/>
                        <div>
                            <CategoryRender groupedCategories={sortedEvents}/>
                        </div>
                    </div>
                    <div className='dash-card'>
                        <div className='pl-3 pr-3  flex fdc hcp' onClick={() => navigate('/projects')}>
                            <div className='m-auto'>
                                <div className='flex jc-c'>
                                    <span>You Have</span>
                                </div>
                                <div  className='flex jc-c'>
                                    <span>{userProjects?.length} Projects</span>
                                </div>
                            </div>
                        </div>
                        <div className='v-divider'/>
                        <div>
                            <CategoryRender groupedCategories={sortedProjects}/>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='dash-card'>
                        <div className='pl-3 pr-3 flex fdc hcp'  onClick={() => navigate('/notes')}>
                            <div className='m-auto'>
                                <div className='flex jc-c'>
                                    <span>You Have</span>
                                </div>
                                <div  className='flex jc-c'>
                                    <span>{userNotes?.length} Notes</span>
                                </div>
                            </div>
                        </div>
                        <div className='v-divider'/>
                        <div>
                            <CategoryRender groupedCategories={sortedNotes}/>
                        </div>
                    </div>
                    <div className='dash-card'>
                        Finances Card
                    </div>
                </div>
            </div>
        </div>
    )
}


interface CategoryRenderProps {
    groupedCategories: any
}

function CategoryRender(props: CategoryRenderProps) {

    const nodes = Object.entries(props?.groupedCategories)?.map((c: any) => {
        return (
            <div 
                className='w-100 flex'
                key={`${c[0]}`}
            >
                {c[0]} ({c?.[1]?.length})
            </div>
        )
    }) || []

    return (
        <div className='pl-2'>
            {nodes}
        </div>
    )
}