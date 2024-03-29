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
import ChecklistCard from '../../features/agenda/ChecklistCard'
import intakeActions from '../../redux/actions/intake'
import IntakeCard from '../../features/intakes/IntakeCard'
import NoteCard from '../../features/notes/NoteCard'
import TasksCard from '../../features/agenda/TasksCard'
import EventsCard from '../../features/agenda/EventsCard'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'





export default function UserAgenda() {


    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])
    const userEvents = useSelector((state: any) => state.events?.queryResult ?? [])
	const userProjects = useSelector((state: any) => state.projects?.queryResult ?? [])
	const userNotes = useSelector((state: any) => state.notes?.queryResult ?? [])
    const userChecklists = useSelector((state: any) => state.checklists?.queryResult ?? [])
    const userAgendas = useSelector((state: any) => state.agendas?.queryResult ?? [])
    const userIntakes = useSelector((state: any) => state.intakes?.queryResult ?? [])

    const [selectedDay, setSelectedDay] = useState<any>(new Date())
    const [selectedAgenda, setSelectedAgenda] = useState<any>([])
    const [agendaChecklists, setAgendaChecklists] = useState<any>([])
    const [agendaCreated, setAgendaCreated] = useState<boolean>(false)

    const [tasksDueToday, setTasksDueToday] = useState<any>()
    const [todaysEvents, setTodaysEvents] = useState<any>()


    const dateFormatOptions : any= {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }


    
    function datesMatch(date1: any, date2: any) {
        return date1.getFullYear() === date2.getFullYear() 
          && date1.getMonth() === date2.getMonth() 
          && date1.getDate() === date2.getDate();
    }


    useEffect(() => {
        store.dispatch(taskActions.setToDos(currentUser?._id))
        store.dispatch(eventActions.setEvents(currentUser?._id))
        store.dispatch(projectActions.setProjects(currentUser?._id))
        store.dispatch(noteActions.setNotes(currentUser?._id))
        store.dispatch(checklistActions.setChecklists(currentUser?._id))
        store.dispatch(agendaActions.setAgendas(currentUser?._id))
        store.dispatch(intakeActions.setIntakes(currentUser?._id))
    }, [currentUser])



    useMemo(() => {

        // Check if Agenda for the active day exists
        const agendaForSelectedDay = userAgendas?.filter((agenda: any) => {
            return datesMatch(new Date(agenda?.agendaDate), selectedDay)
        })
        setSelectedAgenda(agendaForSelectedDay)

        // if there is no agenda for the active day create an agenda for the active day
        if (agendaForSelectedDay?.length === 0) { 
            createUserAgenda() 
        }

    }, [userAgendas, selectedDay])


    useMemo(() => {
        const parentID = selectedAgenda[0]?.id
        const checklistsForAgenda = userChecklists?.filter((checklist: any) => {
            return checklist.parent === parentID
        })
        setAgendaChecklists(checklistsForAgenda)
    }, [selectedAgenda, userChecklists])


    function goToPreviousDate() {
        const date = new Date(selectedDay)
        date.setDate(date.getDate() - 1);
        setSelectedDay(date)
    }

    function goToNextDate() {
        const date = new Date(selectedDay)
        date.setDate(date.getDate() + 1);
        setSelectedDay(date)
    }

    function createUserAgenda() {

        setAgendaCreated(true)

        const newAgendaID = new ObjectID().toString()

        const agenda_dto = {
            id: newAgendaID,
            createdByUserId : currentUser._id,
            agendaDate: selectedDay.toJSON()
        }
        setSelectedAgenda(agenda_dto)
        store.dispatch(agendaActions.add(agenda_dto))
        

    }

    // function createUserChecklist() {
    //     const dto = {
    //         id: new ObjectID().toString(),
    //         title: `Daily Checklist for ${new Date().toLocaleDateString("en-US", dateFormatOptions)}`,
    //         category: 'daily',
    //         parent: selectedAgenda?.[0]?.id,
    //         items: [],
    //         createdByUserId : currentUser._id,
    //         checklistCreationTime: new Date().toJSON()
    //     }
    //     store.dispatch(checklistActions.add(dto))
    // }


    return (
        <div className='user-agenda-component'>
            <div className='flex p-1'>
                <div className='agenda-back-date'>
                    <Button className='h-100' onClick={() => goToPreviousDate()}>
                        <LeftOutlined/>
                    </Button>
                </div>
                <div className='user-agenda-top-bar w-100 ml-1 mr-1'>
                    <h3 id="welcome-back-title">Welcome back, {currentUser?.firstName}!</h3>
                    <h4>{selectedDay.toLocaleDateString("en-US", dateFormatOptions)}</h4>
                    {selectedAgenda?.[0]?.id}
                </div>
                <div className='agenda-forward-date'>
                    <Button className='h-100' onClick={() => goToNextDate()}>
                        <RightOutlined/>
                    </Button>
                </div>
            </div>
            <div className='flex w-100 '>
                <div className='w-20 m-1'>
                    <div className='agenda-body-card  mb-1'>
                        <TasksCard
                            selectedDate={selectedDay}
                        />
                    </div>
                    <div className='agenda-body-card  mb-1'>
                        <EventsCard
                            selectedDate={selectedDay}
                        />
                    </div>
                    {/* <div className='agenda-body-card  mb-1'>
                        Routine Card
                    </div> */}
                </div>
                <div className='w-40 m-1'>
                    <div className='agenda-body-card mb-1'>
                        <ChecklistCard
                            agendaChecklists={agendaChecklists}
                            parent={selectedAgenda}
                            selectedDate={selectedDay}
                        />
                    </div>
                </div>
                <div className='w-40 m-1'>
                    <div className=' agenda-body-card mb-1'>
                        <IntakeCard
                            selectedDate={selectedDay}
                        />
                    </div>
                    <div className=' agenda-body-card'>
                        <NoteCard
                            selectedDate={selectedDay}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}