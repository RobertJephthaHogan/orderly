import React, { useEffect, useState } from 'react'
import './styles.css'
import { store } from '../../../redux/store'
import { useSelector } from 'react-redux'
import taskActions from '../../../redux/actions/tasks'



interface TasksByTimelineProps {
    setSelectedCategory?: any
}

export default function TasksByTimelineMenu(props: TasksByTimelineProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])
    const [sortedTasks, setSortedTasks] = useState<any>()

    useEffect(() => {
        store.dispatch(taskActions.setToDos(currentUser?._id))
    }, [])

    function isDateAfterWithinDays(date1: any, date2: any, numDays: any) {
        const timeDifference = date1.getTime() - date2.getTime();
        const daysInMillis = numDays * 24 * 60 * 60 * 1000;
        return timeDifference > 0 && timeDifference <= daysInMillis;
    }

    useEffect(() => {

        let overdue: any = []
        let dueWithinSeven: any = []
        let dueWithinThirty: any = []
        let dueToday: any = []

        let workingTasks = [...userTasks]
        workingTasks = workingTasks.filter((tsk: any) => !tsk.isCompleted)

        workingTasks?.forEach((tsk: any) => {
            const todaysDate = new Date()
            const taskDueDate = new Date(tsk?.dueDate)

            if (todaysDate > taskDueDate) {
                overdue.push(tsk)

            } else if (isDateAfterWithinDays(taskDueDate, todaysDate, 7)) {
                dueWithinSeven.push(tsk)

            }  else if (isDateAfterWithinDays(taskDueDate, todaysDate, 30)) {
                dueWithinThirty.push(tsk)

            }   else if (isDateAfterWithinDays(taskDueDate, todaysDate, 1)) {
                dueToday.push(tsk)
            }

            const sorted = {
                overdue,
                dueWithinSeven,
                dueWithinThirty,
                dueToday
            }

            setSortedTasks(sorted)
            
        })

    }, [userTasks])


    return (
        <div className='tasks-by-timeline-menu'>
            <div className='tbtm-header'>
                <h4 className='p-1 m-0'>Tasks By Timeline </h4>
            </div>
            <div className='divider' />
            <div className='timegroup-option hcp p-1' onClick={() => props?.setSelectedCategory([['Due Today'], sortedTasks?.dueToday])}>
                <h5 className='m-0 p-0'>Due Today {`(${sortedTasks?.dueToday?.length})`}</h5>
            </div>
            <div className='divider' />
            <div  className='timegroup-option hcp p-1' onClick={() => props?.setSelectedCategory([['Due within 7 days'], sortedTasks?.dueWithinSeven])}>
                <h5 className='m-0 p-0'>Due within 7 days {`(${sortedTasks?.dueWithinSeven?.length})`}</h5>
            </div>
            <div className='divider' />
            <div  className='timegroup-option hcp p-1' onClick={() => props?.setSelectedCategory([['Due within 30 days'], sortedTasks?.dueWithinThirty])}>
                <h5 className='m-0 p-0'> Due within 30 days {`(${sortedTasks?.dueWithinThirty?.length})`}</h5>
            </div>
            <div className='divider' />
            <div  className='timegroup-option hcp p-1' onClick={() => props?.setSelectedCategory([['Overdue'], sortedTasks?.overdue])}>
                <h5 className='m-0 p-0'>Overdue {`(${sortedTasks?.overdue?.length})`}</h5>
            </div>
        </div>
    )
}