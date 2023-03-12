import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { groupByProperty } from '../../helpers'
import './styles.css'




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

    return (
        <div className="user-dashboard">
            <div className="dashboard-overview">
                <div className="overview-card">
                    overview card
                    <h3>Welcome Back {currentUser?.firstName}</h3>
                </div>
            </div>
            <div className="dashboard-body">
                <div className='row'>
                    <div className='dash-card' >
                        <div className='pl-3 pr-3 flex fdc'>
                            <div className='flex jc-c'>
                                <span>You Have</span>
                            </div>
                            <div  className='flex jc-c'>
                                <span>{userTasks?.length} Tasks</span>
                            </div>
                        </div>
                        <div className='v-divider'/>
                        <div>
                            <CategoryRender groupedCategories={sortedTasks}/>
                        </div>
                    </div>
                    <div className='dash-card'>
                        <div className='pl-3 pr-3 flex fdc'>
                            <div className='flex jc-c'>
                                <span>You Have</span>
                            </div>
                            <div  className='flex jc-c'>
                                <span>{userEvents?.length} Events</span>
                            </div>
                        </div>
                        <div className='v-divider'/>
                        <div>
                            <CategoryRender groupedCategories={sortedEvents}/>
                        </div>
                    </div>
                    <div className='dash-card'>
                        <div className='pl-3 pr-3  flex fdc'>
                            <div className='flex jc-c'>
                                <span>You Have</span>
                            </div>
                            <div  className='flex jc-c'>
                                <span>{userProjects?.length} Projects</span>
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
                        <div className='pl-3 pr-3 flex fdc'>
                            <div className='flex jc-c'>
                                <span>You Have</span>
                            </div>
                            <div  className='flex jc-c'>
                                <span>{userNotes?.length} Notes</span>
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