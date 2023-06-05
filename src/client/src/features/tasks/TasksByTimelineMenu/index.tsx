import React, { useEffect, useState } from 'react'
import './styles.css'
import { store } from '../../../redux/store'
import { useSelector } from 'react-redux'
import taskActions from '../../../redux/actions/tasks'



interface TasksByTimelineProps {
    setSelectedCategory?: any
}

export default function TasksByTimelineMenu() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])
    const [sortedTasks, setSortedTasks] = useState<any>()



    useEffect(() => {
        store.dispatch(taskActions.setToDos(currentUser?._id))
    }, [])

    function isDateAfterWithinDays(date1: any, date2: any, numDays: any) {
        const timeDifference = date1.getTime() - date2.getTime();
        console.log('timeDifference', timeDifference)
        const daysInMillis = numDays * 24 * 60 * 60 * 1000;
        return timeDifference > 0 && timeDifference <= daysInMillis;
    }

    useEffect(() => {

        let overdueTasks: any = []
        let dueWithinSeven: any = []
        let dueWithinThirty: any = []

        let workingTasks = [...userTasks]
        workingTasks = workingTasks.filter((tsk: any) => !tsk.isCompleted)

        workingTasks?.forEach((tsk: any) => {
            const todaysDate = new Date()
            const taskDueDate = new Date(tsk?.dueDate)

            // console.log('todaysDate', todaysDate)
            // console.log('taskDueDate', taskDueDate)

            if (todaysDate > taskDueDate) {
                console.log('overdue@!')
                overdueTasks.push(tsk)
            } else if (isDateAfterWithinDays(taskDueDate, todaysDate, 7)) {
                console.log('within 7 days')
                dueWithinSeven.push(tsk)
                // console.log('taskDueDate', taskDueDate)
                // console.log('todaysDate', todaysDate)
            }  else if (isDateAfterWithinDays(taskDueDate, todaysDate, 30)) {
                console.log('within 30 days')
                dueWithinThirty.push(tsk)
                // console.log('taskDueDate', taskDueDate)
                // console.log('todaysDate', todaysDate)
            } else {
                console.log('not')
            }

            const sorted = {
                overdue: overdueTasks,
                dueWithinSeven: dueWithinSeven,
                dueWithinThirty: dueWithinThirty
            }
            setSortedTasks(sorted)
            
        })


    }, [userTasks])

    console.log('userTasks', userTasks)
    console.log('sortedTasks', sortedTasks)
    // TODO: 
        // Go Through all the tasks and compare date to dueDate
        // Sort Accordingly

    return (
        <div className='tasks-by-timeline-menu'>
            <div className='tbtm-header'>
                <h4 className='p-1 m-0'>Tasks By Timeline </h4>
            </div>
            <div className='divider' />
            <div className='timegroup-option hcp p-1'>
                <h5 className='m-0 p-0'>Due Today</h5>
            </div>
            <div className='divider' />
            <div  className='timegroup-option hcp p-1'>
                <h5 className='m-0 p-0'>Due within 7 days {`(${sortedTasks?.dueWithinSeven?.length})`}</h5>
            </div>
            <div className='divider' />
            <div  className='timegroup-option hcp p-1'>
                <h5 className='m-0 p-0'> Due within 30 days {`(${sortedTasks?.dueWithinThirty?.length})`}</h5>
            </div>
            <div className='divider' />
            <div  className='timegroup-option hcp p-1'>
                <h5 className='m-0 p-0'>Overdue {`(${sortedTasks?.overdue?.length})`}</h5>
            </div>
        </div>
    )
}