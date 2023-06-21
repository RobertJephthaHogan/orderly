
import { useEffect, useMemo, useState } from 'react'
import DailySchedule from '../../DailySchedule'
import { useSelector } from 'react-redux'
import { store } from '../../../../redux/store'
import eventActions from '../../../../redux/actions/event'
import { datesMatch } from '../../../../helpers'



type Props = {
    activeTimeframe?: any
    events?: any
    tasks?: any
    selectedDay?: any
    onDateSelect?: any
}


const WeekView : React.FC<Props> = ({
    selectedDay,
    events
}) => {
    
    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userEvents = useSelector((state: any) => state.events?.queryResult ?? [])
    const [wv, setWv] = useState<any>([]) 

    
    useEffect(() => {
        store.dispatch(eventActions.setEvents(currentUser?._id))
    }, [])
    
    useEffect(() => {
        if (!wv?.length) {
            generateWeekViewData()
        }
    })

    useMemo(() => {
        generateWeekViewData()
    }, [selectedDay])


    function generateWeekViewData() {
        const dayOfWeek = new Date(selectedDay).getDay()

        let thisWeeksDays = []
        let precedingDates = []
        let followingDates = []

        // Loop four times to get the preceding days in the week
        for (var i = 0; i < dayOfWeek; i++) {
            const date = new Date(selectedDay);
            date.setDate(date.getDate() - i - 1);
            precedingDates.push(date.toISOString().split('T')[0]);
        }

        // Loop four times to get the following days in the week
        for (var i = 0; i < (6 - dayOfWeek); i++) {
            const date = new Date(selectedDay);
            date.setDate(date.getDate() + i + 1);
            followingDates.push(date.toISOString().split('T')[0]);
        }
        
        precedingDates = precedingDates.reverse()

        thisWeeksDays = [
            ...precedingDates, 
            new Date(selectedDay).toISOString().split('T')[0], 
            ...followingDates
        ]

        console.log('thisWeeksDays', thisWeeksDays)


        const weekViewColumns = thisWeeksDays?.map((date: any) => {
            console.log('date', date)
            
            const eventsForThisDay = userEvents?.filter((event: any) => datesMatch(new Date(event?.startTime), new Date(date) ))

            console.log('eventsForThisDay', eventsForThisDay)

            return (
                <div 
                    className='w-100 bordered'
                    key={`${date}-column`}
                >
                    {date}
                    <DailySchedule 
                        selectedCalendarDate={date}
                        eventsOnSelectedDay={eventsForThisDay}
                    />
                </div>
            )
        }) || []

        setWv(weekViewColumns)
    }


    return (
        <div className="week-view-wrapper">
            <div className="week-view" >
                <div className='week-view-body'>
                    {wv}
                </div>
            </div>
        </div>
    )
}


export default WeekView