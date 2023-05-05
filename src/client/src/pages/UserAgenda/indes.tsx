import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import taskActions from '../../redux/actions/tasks'
import eventActions from '../../redux/actions/event'
import projectActions from '../../redux/actions/project'
import noteActions from '../../redux/actions/notes'
import './styles.css'
import checklistActions from '../../redux/actions/checklist'
import agendaActions from '../../redux/actions/agenda'
import { ObjectID } from 'bson'





export default function UserAgenda() {

    const [selectedDay, setSelectedDay] = useState<any>(new Date())
    const [selectedAgenda, setSelectedAgenda] = useState<any>([])
    const [agendaChecklists, setAgendaChecklists] = useState<any>([])

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])
    const userEvents = useSelector((state: any) => state.events?.queryResult ?? [])
	const userProjects = useSelector((state: any) => state.projects?.queryResult ?? [])
	const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])
    const userChecklists = useSelector((state: any) => state.checklists?.queryResult ?? [])
    const userAgendas = useSelector((state: any) => state.agendas?.queryResult ?? [])


    const dateFormatOptions : any= {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }


    useEffect(() => {
        store.dispatch(taskActions.setToDos(currentUser?._id))
        store.dispatch(eventActions.setEvents(currentUser?._id))
        store.dispatch(projectActions.setProjects(currentUser?._id))
        store.dispatch(noteActions.setNotes(currentUser?._id))
        store.dispatch(checklistActions.setChecklists(currentUser?._id))
        store.dispatch(agendaActions.setAgendas(currentUser?._id))
    }, [currentUser])



    useMemo(() => {

        // Check if Agenda for the active day exists
        const agendaForSelectedDay = userAgendas?.filter((agenda: any) => {
            return datesMatch(new Date(agenda?.agendaDate), selectedDay)
        })
        setSelectedAgenda(agendaForSelectedDay)
        console.log('agendaForSelectedDay', agendaForSelectedDay)

        const parentID = agendaForSelectedDay[0]?.id
        console.log(parentID)
        console.log('userChecklists', userChecklists)
        const checklistsForAgenda = userChecklists?.filter((checklist: any) => {
            return checklist.parent == parentID
        })
        console.log('checklistsForAgenda', checklistsForAgenda)
        setAgendaChecklists(checklistsForAgenda)

        if (agendaForSelectedDay?.length === 0) { // if there is no agenda for the active day
            createUserAgenda() // Create an agenda for the active day
        }


    }, [userAgendas, selectedDay])

    useEffect(() => {
        console.log('agendaChecklists', agendaChecklists)

    }, [agendaChecklists])

    useMemo(() => {
        console.log('selectedAgenda', selectedAgenda)
        const parentID = selectedAgenda[0]?.id
        const checklistsForAgenda = userChecklists?.filter((checklist: any) => {
            return checklist.parent === parentID
        })
        setAgendaChecklists(checklistsForAgenda)
    }, [selectedAgenda])

    // useMemo(() => {

    //     console.log('HERE!!!!!!!!!!!!', selectedAgenda)

    //     // Check if Checklist for the active day exists    

    //     if (selectedAgenda?.length > 0) { // If there is an agenda for the active day

    //         // Go through all checklists and find all which have the current agenda as the parent
    //         const parentID = selectedAgenda[0]?.id
    //         const checklistsForAgenda = userChecklists?.filter((checklist: any) => {
    //             return checklist.parent === parentID
    //         })
    //         console.log('checklistsForAgenda', checklistsForAgenda)

    //         if (checklistsForAgenda?.length === 0) {
    //             console.log('No Checklists for the active agenda')
    //             // TODO: create a checklist for the active agenda when none exists
    //             createUserChecklist()
    //         }

    //         if (checklistsForAgenda?.length) {
    //             console.log('Checklists for the active agenda:', checklistsForAgenda)
    //         }

    //     }
        

    // }, [selectedAgenda?.[0]?.id])


    function datesMatch(date1: any, date2: any) {
        return date1.getFullYear() === date2.getFullYear() 
          && date1.getMonth() === date2.getMonth() 
          && date1.getDate() === date2.getDate();
    }


    function createUserAgenda() {

        const newAgendaID = new ObjectID().toString()

        const agenda_dto = {
            id: newAgendaID,
            createdByUserId : currentUser._id,
            agendaDate: selectedDay.toJSON()
        }
        store.dispatch(agendaActions.add(agenda_dto))
        setSelectedAgenda(agenda_dto)

        const checklist_dto = {
            id: new ObjectID().toString(),
            title: `Daily Checklist for ${new Date().toLocaleDateString("en-US", dateFormatOptions)}`,
            category: 'daily',
            parent: newAgendaID,
            items: [],
            createdByUserId : currentUser._id,
            checklistCreationTime: new Date().toJSON()
        }
        store.dispatch(checklistActions.add(checklist_dto))
        setAgendaChecklists(checklist_dto)
    }

    function createUserChecklist() {
        const dto = {
            id: new ObjectID().toString(),
            title: `Daily Checklist for ${new Date().toLocaleDateString("en-US", dateFormatOptions)}`,
            category: 'daily',
            parent: selectedAgenda?.[0]?.id,
            items: [],
            createdByUserId : currentUser._id,
            checklistCreationTime: new Date().toJSON()
        }
        store.dispatch(checklistActions.add(dto))
    }


    return (
        <div className='user-agenda-component'>
            <div className='p-1'>
                <div className='user-agenda-top-bar'>
                    <h3 id="welcome-back-title">Welcome back, {currentUser?.firstName}!</h3>
                    <h4>{new Date().toLocaleDateString("en-US", dateFormatOptions)}</h4>
                    {selectedAgenda?.[0]?.id}
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