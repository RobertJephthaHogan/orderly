import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import taskActions from '../../redux/actions/tasks'
import eventActions from '../../redux/actions/event'
import projectActions from '../../redux/actions/project'
import noteActions from '../../redux/actions/notes'
import './styles.css'
import checklistActions from '../../redux/actions/checklist'
import agendaActions from '../../redux/actions/agenda'


export default function UserAgenda() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])
    const userEvents = useSelector((state: any) => state.events?.queryResult ?? [])
	const userProjects = useSelector((state: any) => state.projects?.queryResult ?? [])
	const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])
    const userChecklists = useSelector((state: any) => state.checklists?.queryResult ?? [])
    const userAgendas = useSelector((state: any) => state.agendas?.queryResult ?? [])

    useEffect(() => {
        store.dispatch(taskActions.setToDos(currentUser?._id))
        store.dispatch(eventActions.setEvents(currentUser?._id))
        store.dispatch(projectActions.setProjects(currentUser?._id))
        store.dispatch(noteActions.setNotes(currentUser?._id))
        store.dispatch(checklistActions.setChecklists(currentUser?._id))
        store.dispatch(agendaActions.setAgendas(currentUser?._id))
    }, [currentUser])


    function createUserAgenda() {



    }

    const dateFormatOptions : any= {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };



    return (
        <div className='user-agenda-component'>
            <div className='p-1'>
                <div className='user-agenda-top-bar'>
                    <h3 id="welcome-back-title">Welcome back, {currentUser?.firstName}!</h3>
                    <h4>{new Date().toLocaleDateString("en-US", dateFormatOptions)}</h4>
                </div>
            </div>
            <div className='flex w-100 '>
                <div className='w-20 m-1'>
                    <div className='agenda-body-card'>
                        Tasks Card
                    </div>
                    <div className='agenda-body-card'>
                        Events Card
                    </div>
                    <div className='agenda-body-card'>
                        Projects Card
                    </div>
                </div>
                <div className='w-40 m-1'>
                    <div className='agenda-body-card'>
                        Checklist Card
                    </div>
                    <div className='agenda-body-card'>
                        Nutrition Card
                    </div>
                </div>
                <div className='w-40 m-1'>
                    <div className=' agenda-body-card'>
                        Notes Card
                    </div>
                </div>
            </div>
        </div>
    )
}