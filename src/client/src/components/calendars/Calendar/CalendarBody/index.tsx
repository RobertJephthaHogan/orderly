import { Tag, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import './styles.css'

type Props = {
    activeTimeframe?: any
    events?: any
    tasks?: any
    selectedDay?: any
    onDateSelect?: any
}

export const CalendarBody : React.FC<Props> = ({
    activeTimeframe,
    events,
    tasks,
    selectedDay,
    onDateSelect
}) => {


    if (activeTimeframe === 'tf-year') {
        return (
            <YearView
                selectedDay={selectedDay}
                onDateSelect={onDateSelect}
                events={events}
                tasks={tasks}
            />
        )
    } else if (activeTimeframe === 'tf-month') {
        return (
            <MonthView
                selectedDay={selectedDay}
                onDateSelect={onDateSelect}
                events={events}
                tasks={tasks}
            />
        )
    } else if (activeTimeframe === 'tf-week') {
        return (
            <WeekView
                selectedDay={selectedDay}
                onDateSelect={onDateSelect}
                events={events}
                tasks={tasks}
            />
        )
    }


    return (
        <>
            CalendarBody!
        </>
    )
}





const YearView : React.FC<Props> = ({
    selectedDay,
    events
}) => {

    return (
        <div className="year-view-wrapper">
            <div className="year-view" >
                <div className='year-view-row'>
                    <div className='month-cell'>
                        January
                    </div>
                    <div className='month-cell'>
                        February
                    </div>
                    <div className='month-cell'>
                        March
                    </div>
                </div>
                <div className='year-view-row'>
                    <div className='month-cell'>
                        April
                    </div>
                    <div className='month-cell'>
                        May
                    </div>
                    <div className='month-cell'>
                        June
                    </div>
                </div>
                <div className='year-view-row'>
                    <div className='month-cell'>
                        July
                    </div>
                    <div className='month-cell'>
                        August
                    </div>
                    <div className='month-cell'>
                        September
                    </div>
                </div>
                <div className='year-view-row'>
                    <div className='month-cell'>
                        October
                    </div>
                    <div className='month-cell'>
                        November
                    </div>
                    <div className='month-cell'>
                        December
                    </div>
                </div>
            </div>
        </div>
    )
}


const MonthView : React.FC<Props> = ({
    selectedDay,
    onDateSelect,
    events, 
    tasks
}) => {

    const [monthViewData, setMonthViewData] = useState<any>({})
    const [mv, setMv] = useState<any>()
        
    useEffect(() => {
        if (!monthViewData) {
            generateMonthViewData()
        } else if (!mv) (
            createMonthView()
        )
    })

    useEffect(() => {
        generateMonthViewData()
    }, [selectedDay, events])
    
    useEffect(() => {
        createMonthView()
    }, [monthViewData])

    const getDaysInMonth = (year: any, month: any) => {
        return new Date(year, month, 0).getDate();
    }


    const generateMonthViewData = () => {
        const now = selectedDay;
        const firstDay = new Date(now?.getFullYear(), now.getMonth(), 1);
        const firstDayDay = firstDay.getDay()
        const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth() , -1+1)

        let daysFromLastMonth = []
    
        for (let i = 0; i < firstDayDay; i++) { // get days from last month to prefill first row cells
            daysFromLastMonth.push(new Date(lastDayLastMonth))
            lastDayLastMonth.setDate(lastDayLastMonth.getDate()-1)
        }

        const reversedDFLM = daysFromLastMonth.reverse()

        let workingObj : any = { // create data structure for month view render
            0 : [...reversedDFLM],
            1 : [],
            2 : [],
            3 : [],
            4 : [],
            5 : [],
        }
    
        const daysInCurrentMonth = getDaysInMonth(now.getFullYear(), now.getMonth() + 1); // # days in current month
    
        for (let i=1; i <= daysInCurrentMonth; i++) {
            for (let j=0; j < 6; j++) {
                if (workingObj[j]?.length < 7) {
                    const nextDay = new Date(now.getFullYear(), now.getMonth(), i)
                    workingObj[j].push(nextDay)
                    break
    
                }
            }
        }

        const daysInSecondToLastRow = workingObj[4].length // number of days from current month in second to last weeks row
        const daysInLastRow = workingObj[5].length // number of days from current month in last weeks row

        if (daysInSecondToLastRow < 7) { // if second to last weeks row does not have 7 days
            const nextMonthsDaysNeeded = 14 - daysInSecondToLastRow // get # of days needed to fill last two weeks
            let datesToAdd = []
            for (let i = 1; i <= nextMonthsDaysNeeded; i++) { // add remaining days from next month to fill both rows
                let nextDay = new Date(now.getFullYear(), now.getMonth() + 1, i)
                datesToAdd.push(nextDay)
            }
            let secondToLastDatesToAdd = datesToAdd.slice(0,(nextMonthsDaysNeeded-7)) // array for days needed in second to last week
            let lastDatesToAdd = datesToAdd.slice((nextMonthsDaysNeeded-7), ) // array for days needed in last week
            workingObj[4] = [...workingObj[4], ...secondToLastDatesToAdd]
            workingObj[5] = [...workingObj[5], ...lastDatesToAdd]

        } else if (daysInLastRow < 7) { // else if last weeks row does not have 7 days, follows same process but for only last week
            const nextMonthsDaysNeeded = 7 - daysInLastRow
            let datesToAdd = []
            for (let i = 1; i <= nextMonthsDaysNeeded; i++) { 
                let nextDay = new Date(now.getFullYear(), now.getMonth() + 1, i)
                datesToAdd.push(nextDay)
            }
            workingObj[5] = [...workingObj[5], ...datesToAdd]
        }
        setMonthViewData(workingObj)
    }


    const onCellClick = (data: any) => {
        onDateSelect(data)
    }


    const createMonthView = () => {
        const constr = Object.entries(monthViewData)?.map((week: any) => {
            return (
                <div 
                    className='flex w-100' 
                    key={`week${week.toString()}`}
                >
                    {
                        week?.[1].map((day:any) => {

                            let eventsOnThisDay : any = []
                            let tasksOnThisDay : any = []

                            events?.forEach((evt: any) => {
                                if (new Date(evt?.startTime)?.toJSON().split('T')[0] == day?.toJSON().split('T')[0]) {
                                    eventsOnThisDay.push(evt)
                                }
                            }) 

                            tasks?.forEach((tsk: any) => {
                                //console.log('tsk', tsk)
                                if (new Date(tsk?.dueDate)?.toJSON().split('T')[0] == day?.toJSON().split('T')[0]) {
                                    tasksOnThisDay.push(tsk)
                                }
                            }) 

                            const eventsToRender = eventsOnThisDay?.map((evt: any) => {


                                let chipType

                                if (evt?.category == 'Meeting') {
                                    chipType = 'meeting-chip'

                                } else if (evt?.category == 'Birthday') {
                                    chipType = 'birthday-chip'

                                } else if (evt?.category == 'Work') {
                                    chipType = 'work-chip'
                                    
                                } else {
                                    chipType = 'event-chip'
                                }



                                return (
                                    <Tooltip title={`${evt?.title}`}>
                                        <div 
                                            key={evt?.id}
                                            className='event-chip-wrapper'
                                        >
                                            <div className={`${chipType}`}>
                                                {evt?.title}
                                            </div>
                                        </div>
                                    </Tooltip>
                                )
                                
                            }) || []

                            const tasksToRender = tasksOnThisDay?.map((tsk: any) => {

                                let chipType
                                if (tsk?.category == 'Meeting') {
                                    chipType = 'meeting-chip'

                                } else if (tsk?.category == 'Birthday') {
                                    chipType = 'birthday-chip'

                                } else if (tsk?.category == 'Work') {
                                    chipType = 'work-chip'
                                    
                                } else if (tsk?.category == 'Personal Projects') {
                                    chipType = 'project-chip'
                                    
                                } else {
                                    chipType = 'event-chip'
                                }

                                return (
                                    <Tooltip title={`${tsk.title}`}>
                                        <div 
                                            key={tsk?.id}
                                            className='event-chip-wrapper'
                                        >
                                            <div className={`${chipType}`}>
                                                {tsk.isCompleted ? <s><h5>-{tsk.title}</h5></s> : <h5>-{tsk.title}</h5>}
                                            </div>
                                        </div>
                                    </Tooltip>
                                )

                                
                            }) || []


                            if (selectedDay.toJSON() == day.toJSON()) { // if selected date matches this cells date render selected cell 
                                return (
                                    <div 
                                        className='w-100 bordered day-cell active-monthly-day-cell' 
                                        key={day.toString()}
                                        onClick={() => onCellClick(day)}
                                    >
                                        {/* {day.toString()} */}
                                        <span className='ml-1'>{day.getDate().toString()}</span>
                                        {eventsToRender}
                                        {tasksToRender}
                                    </div>
                                )
                            }
                            return (
                                <div 
                                    className='w-100 bordered day-cell' 
                                    key={day.toString()}
                                    onClick={() => onCellClick(day)}
                                >
                                    {/* {day.toString()} */}
                                    <span className='ml-1'>{day.getDate().toString()}</span>
                                    {eventsToRender}
                                    {tasksToRender}
                                </div>
                            )
                        }) || []
                    }
                </div>
            )
        }) || []
        setMv(constr)
    }

    return (
        <div className="month-view-wrapper">
            <div className="month-view" >
                {mv}
            </div>
        </div>
    )
}





const WeekView : React.FC<Props> = ({
    selectedDay,
    events
}) => {

    const [weekViewData, setWeekViewData] = useState<any>()
    const [wv, setWv] = useState<any>([]) 

    


    useEffect(() => {
        if (!wv?.length) {

            generateWeekViewData()

        }
    })


    const generateWeekViewData = () => {
        const dayOfWeek = selectedDay.getDay()
        let thisWeeksDays = []
        let yesterday = new Date();

        if (dayOfWeek === 0) {
            thisWeeksDays.push(selectedDay)

            for (let i = 1; i < 7; i++) {
                let tomorrow = new Date();
                tomorrow.setDate(selectedDay.getDate() + i)
                thisWeeksDays.push(tomorrow)
            }

            setWv(thisWeeksDays)
        } else if (dayOfWeek === 6) {

        }  else {

        }

    }


    const getDaysBefore = () => {

    }

    const getDaysAfter = () => {
        
    }



    return (
        <div className="week-view-wrapper">
            Week View!
            <div className="week-view" >
                <div className='week-view-body'>
                    {
                        wv?.map((day:any) => {
                            return (
                                <div className='w-100 bordered'>
                                    {/* {day.toString()} */}
                                    {day.getDate().toString()}
                                </div>
                            )
                        }) || []
                    }
                </div>
            </div>
        </div>
    )
}