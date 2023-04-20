import React, { useEffect } from 'react'
import './styles.css'
import { store } from '../../../redux/store'
import { useSelector } from 'react-redux'
import taskActions from '../../../redux/actions/tasks'



export default function TasksByTimelineMenu() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userTasks = useSelector((state: any) => state.tasks?.queryResult ?? [])

    useEffect(() => {
        store.dispatch(taskActions.setToDos(currentUser?._id))
    }, [])

    console.log('userTasks', userTasks)
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
            <div  className='timegroup-option hcp p-1'>
                <h5 className='m-0 p-0'>Due within 7 days</h5>
            </div>
            <div  className='timegroup-option hcp p-1'>
                <h5 className='m-0 p-0'> Due within 30 days</h5>
            </div>
            <div  className='timegroup-option hcp p-1'>
                <h5 className='m-0 p-0'>Overdue</h5>
            </div>
        </div>
    )
}