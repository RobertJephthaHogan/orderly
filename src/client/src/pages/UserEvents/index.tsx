import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { groupByProperty } from '../../helpers'
import eventActions from '../../redux/actions/event'
import { store } from '../../redux/store'
import { Calendar } from '../../components/calendars/Calendar'
import { EventMenu } from '../../features/events/EventMenu'
import { EventForm } from '../../components/forms/EventForm'
import './styles.css'
import NewEventForm from '../../components/forms/NewEventForm'



export const UserEvents : React.FC = () => {

    const userEvents = useSelector((state: any) => state.events?.queryResult ?? [])
    const [sortedEvents, setSortedEvents] = useState<any>({})
    const [selectedEvent, setSelectedEvent] = useState<any>()
    const [selectedCategory, setSelectedCategory] = useState<any>()
    const [selectedDate, setSelectedDate] = useState<any>()
    const [eventsToDisplay, setEventsToDisplay] = useState<any>()


    useEffect(() => {
        store.dispatch(eventActions.setEvents(store.getState()?.user?.data?._id))
    }, [])

    useEffect(() => {
        const st = groupByProperty(userEvents, 'category')
        const returnedTarget = Object.assign({All: userEvents}, st);
        setSortedEvents(returnedTarget)
        setEventsToDisplay(userEvents)
    }, [userEvents])

    const setEvent = (evt: any) => {
        setSelectedEvent(evt)
    }

    const setCategory = (category: any) => {
        setEventsToDisplay(category?.children)
    }

    const setDate = (value: any) => {
        console.log('onCellSelect', value)
        setSelectedDate(value)
    }


    return (
        <div className='user-events'>
            <div className='w-100 p-2'>
                <div 
                    className='bordered'
                    //style={{height:'100px'}}
                >
                    {/* <EventForm
                        existingEvent={selectedEvent}
                        formOperation={selectedEvent?.id?.length ? 'edit' : 'add'}
                    /> */}
                    <NewEventForm
                        existingEvent={selectedEvent}
                        formOperation={selectedEvent?.id?.length ? 'edit' : 'add'}
                        setEvent={setEvent}
                    />
                </div>
            </div>
            <div className='w-100 flex p-2'>
                <div className='bordered left-bar'>
                    <div className='w-100 flex content-center p-1'>
                        Event Categories
                    </div>
                    <div className='divider'/>
                    <div>
                        <EventMenu
                            sortedEvents={sortedEvents}
                            setEvent={setEvent}
                            setCategory={setCategory}
                            //selectedEvent={selectedEvent}
                            selectedCategory={selectedCategory}
                        />
                    </div>
                </div>
                <div className='bordered right-bar'>
                    <Calendar
                        eventsToDisplay={eventsToDisplay}
                        onCellSelect={setDate}
                    />
                </div>
            </div>
        </div>
    )
}