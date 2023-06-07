
import { useEffect, useState } from 'react'
import DailySchedule from '../../DailySchedule'



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

    const [wv, setWv] = useState<any>([]) 

    
    useEffect(() => {
        if (!wv?.length) {
            generateWeekViewData()
        }
    })


    const generateWeekViewData = () => {
        const dayOfWeek = selectedDay.getDay()

        let thisWeeksDays = []
        let precedingDates = []
        let followingDates = []

        // Loop four times to get the preceding days in the week
        for (var i = 0; i < dayOfWeek; i++) {
            var date = new Date();
            date.setDate(date.getDate() - i - 1);
            precedingDates.push(date.toISOString().split('T')[0]);
        }

        // Loop four times to get the following days in the week
        for (var i = 0; i < (6 - dayOfWeek); i++) {
            var date = new Date();
            date.setDate(date.getDate() + i + 1);
            followingDates.push(date.toISOString().split('T')[0]);
        }
        
        precedingDates = precedingDates.reverse()

        thisWeeksDays = [
            ...precedingDates, 
            new Date(selectedDay).toISOString().split('T')[0], 
            ...followingDates
        ]

        const weekViewColumns = thisWeeksDays?.map((date: any) => {
            return (
                <div 
                    className='w-100 bordered'
                    key={`${date}-column`}
                >
                    {date}
                    <DailySchedule selectedCalendarDate={date}/>
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