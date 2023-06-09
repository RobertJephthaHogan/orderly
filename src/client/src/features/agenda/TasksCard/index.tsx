import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../redux/store'
import taskActions from '../../../redux/actions/tasks'



export default function TasksCard() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])
    const [organizedTasks, setOrganizedTasks] = useState<any>()

    
    useEffect(() => {
        store.dispatch(taskActions.setToDos(currentUser?._id))
    }, [])
    
    function isDateAfterWithinDays(date1: any, date2: any, numDays: any) {
        const timeDifference = date1.getTime() - date2.getTime();
        const daysInMillis = numDays * 24 * 60 * 60 * 1000;
        return timeDifference > 0 && timeDifference <= daysInMillis;
    }
    
    useEffect(() => {
        // Organize Tasks by duedate range 
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

            setOrganizedTasks(sorted)
            
        })

    }, [userTasks])

    useEffect(() => {

        const sortedByDate = [...userTasks].sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        //console.log('sortedByDate', sortedByDate)
        //TODO: Create array for tasks due before today
        //TODO: Create array for tasks due on or after today
        //TODO: render tasks queue from array for tasks due on or after today


    }, [userTasks])

    return (
        <div className='p-1'>
            <div>
                <h5>Due Today ({`${organizedTasks?.dueToday?.length}`})</h5>
            </div>
            <div>
                <h5>Due Within 7 Days ({`${organizedTasks?.dueWithinSeven?.length}`})</h5>
            </div>
            <div>
                <h5>Due Within 30 Days ({`${organizedTasks?.dueWithinThirty?.length}`})</h5>
            </div>
            {/* <div>
                Upcoming task deadlines render
            </div> */}
        </div>
    )
}