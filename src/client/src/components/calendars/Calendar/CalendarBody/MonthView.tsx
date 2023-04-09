import React from 'react'
import { useEffect, useState } from 'react'
import eventActions from '../../../../redux/actions/event'
import taskActions from '../../../../redux/actions/tasks'
import { store } from '../../../../redux/store'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Dropdown, Tag, Tooltip } from 'antd'



interface Props {
    activeTimeframe?: any
    events?: any
    tasks?: any
    selectedDay?: any
    onDateSelect?: any
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
    }, [selectedDay, events, tasks])
    
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

    const onDeleteEvent = (e: any, event: any) => {
        e.stopPropagation()
        console.log('event', event)
        store.dispatch(eventActions.delete(event?.id))
    }

    const onDeleteTask = (e: any, task: any) => {
        e.stopPropagation()
        console.log('task', task)
        store.dispatch(taskActions.delete(task?.id))
    }

    const toggleTaskCompleted = (e: any, task: any) => {
        e.stopPropagation()
        const taskId = task.id
        let working = {...task}
        working['isCompleted'] = !task.isCompleted
        store.dispatch(taskActions.update(taskId, working))
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
                                    <Dropdown dropdownRender={menu => (
                                        <div
                                            style={{
                                                background: '#ffffff',
                                                border: '1px solid #dfdfdf',
                                            }}
                                            className='flex pb-2'
                                        >
                                            <div className='mt-2 ml-3 mr-1'>
                                                <h5 >{`${evt?.title}`}</h5>
                                                {
                                                    Object.entries(evt)?.map((atr: any) => {
                                                        return (
                                                            <div className='flex'>
                                                                <div>
                                                                    {atr[0]}:
                                                                </div>
                                                                <div className='ml-2'>
                                                                    {atr[1]}
                                                                </div>
                                                            </div>
                                                        )
                                                    }) || []
                                                }
                                            </div>
                                            <div className='v-divider'/>
                                            <div className='mt-2 ml-1 mr-1'>
                                                {/* <button 
                                                    className='btn-task-complete'
                                                    onClick={() => console.log('checked')}
                                                >
                                                    <CheckOutlined/>
                                                </button> */}
                                                <button 
                                                    className='btn-task-delete'
                                                    onClick={(e) => onDeleteEvent(e, evt)}
                                                >
                                                    <CloseOutlined/>
                                                </button>
                                            </div>
                                        </div>
                                    )}>
                                        <div 
                                            key={evt?.id}
                                            className='event-chip-wrapper'
                                        >
                                            <div className={`${chipType}`}>
                                                {evt?.title}
                                            </div>
                                        </div>
                                    </Dropdown>
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
                                    <Dropdown dropdownRender={menu => (
                                        <div
                                            style={{
                                                background: '#ffffff',
                                                border: '1px solid #dfdfdf',
                                            }}
                                            className='flex pb-2'
                                        >
                                            <div className='mt-2 ml-3 mr-1'>
                                                <h5 >{`${tsk?.title}`}</h5>
                                                {
                                                    Object.entries(tsk)?.map((atr: any) => {
                                                        return (
                                                            <div className='flex'>
                                                                <div>
                                                                    {atr[0]}:
                                                                </div>
                                                                <div className='ml-2'>
                                                                    {atr[1]}
                                                                </div>
                                                            </div>
                                                        )
                                                    }) || []
                                                }
                                            </div>
                                            <div className='v-divider'/>
                                            <div className='mt-2 ml-1 mr-1'>
                                                <button 
                                                    className='btn-task-complete'
                                                    onClick={(e) => toggleTaskCompleted(e, tsk)}
                                                >
                                                    <CheckOutlined/>
                                                </button>
                                                <button 
                                                    className='btn-task-delete'
                                                    onClick={(e) => onDeleteTask(e, tsk)}
                                                >
                                                    <CloseOutlined/>
                                                </button>
                                            </div>
                                        </div>
                                    )}>
                                        <div 
                                            key={tsk?.id}
                                            className='event-chip-wrapper'
                                        >
                                            <div className={`${chipType}`}>
                                                {tsk.isCompleted ? <s><h5>-{tsk.title}</h5></s> : <h5>-{tsk.title}</h5>}
                                            </div>
                                        </div>
                                    </Dropdown>
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



export default MonthView