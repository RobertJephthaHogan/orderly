import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../redux/store'
import eventActions from '../../../redux/actions/event'





interface EventCardProps {
    selectedDate?: any 
}

export default function EventsCard(props: EventCardProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userEvents = useSelector((state: any) => state.events?.queryResult ?? [])
    const [organizedEvents, setOrganizedEvents] = useState<any>()

    useEffect(() => {
        store.dispatch(eventActions.setEvents(currentUser?._id))
    }, [])
    
    function isDateAfterWithinDays(date1: any, date2: any, numDays: any) {
        const timeDifference = date1.getTime() - date2.getTime();
        const daysInMillis = numDays * 24 * 60 * 60 * 1000;
        return timeDifference > 0 && timeDifference <= daysInMillis;
    }
        
    useEffect(() => {
        // Organize Events by duedate range 
        let overdue: any = []
        let eventsWithinSeven: any = []
        let eventsWithinThirty: any = []
        let eventsToday: any = []

        let workingEvents = [...userEvents]

        workingEvents?.forEach((evt: any) => {
            const todaysDate =  props.selectedDate ? new Date(props.selectedDate) : new Date()
            const taskDueDate = new Date(evt?.startTime)

            if (todaysDate > taskDueDate) {
                overdue.push(evt)

            } else if (isDateAfterWithinDays(taskDueDate, todaysDate, 7)) {
                eventsWithinSeven.push(evt)

            }  else if (isDateAfterWithinDays(taskDueDate, todaysDate, 30)) {
                eventsWithinThirty.push(evt)

            }   else if (isDateAfterWithinDays(taskDueDate, todaysDate, 1)) {
                eventsToday.push(evt)
            }

            const sorted = {
                overdue,
                eventsWithinSeven,
                eventsWithinThirty,
                eventsToday
            }

            setOrganizedEvents(sorted)
            
        })

    }, [userEvents, props.selectedDate])



    return (
        <div className='p-1'>
            <div>
                <h5>Events Today ({`${organizedEvents?.eventsToday?.length}`})</h5>
            </div>
            <div>
                <h5>Events Within 7 Days ({`${organizedEvents?.eventsWithinSeven?.length}`})</h5>
            </div>
            <div>
                <h5>Events Within 30 Days ({`${organizedEvents?.eventsWithinThirty?.length}`})</h5>
            </div>
            {/* <div>
                Upcoming Events render
            </div> */}
        </div>
    )
}