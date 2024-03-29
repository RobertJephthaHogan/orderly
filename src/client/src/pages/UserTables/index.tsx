import React, { useEffect, useState } from 'react'
import './styles.css'
import TableTopBar from '../../features/tables/TableTopBar'
import MainTable from '../../features/tables/MainTable'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import taskActions from '../../redux/actions/tasks'
import eventActions from '../../redux/actions/event'
import projectActions from '../../redux/actions/project'
import noteActions from '../../redux/actions/notes'
import checklistActions from '../../redux/actions/checklist'
import agendaActions from '../../redux/actions/agenda'
import intakeActions from '../../redux/actions/intake'



export default function UserTables() {
    
    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userTasks = useSelector((state: any) => state.tasks ?? [])
    const userEvents = useSelector((state: any) => state.events ?? [])
	const userProjects = useSelector((state: any) => state.projects ?? [])
	const userNotes = useSelector((state: any) => state.notes ?? [])
    const userChecklists = useSelector((state: any) => state.checklists ?? [])
    const userAgendas = useSelector((state: any) => state.agendas ?? [])
    const userIntakes = useSelector((state: any) => state.intakes ?? [])

    const [selectedTable, setSelectedTable] = useState<string>('Tasks')
    const [tableData, setTableData] = useState<any>()

    useEffect(() => {
        store.dispatch(taskActions.setToDos(currentUser?._id))
        store.dispatch(eventActions.setEvents(currentUser?._id))
        store.dispatch(projectActions.setProjects(currentUser?._id))
        store.dispatch(noteActions.setNotes(currentUser?._id))
        store.dispatch(checklistActions.setChecklists(currentUser?._id))
        store.dispatch(agendaActions.setAgendas(currentUser?._id))
        store.dispatch(intakeActions.setIntakes(currentUser?._id))
    }, [currentUser])

    const onTableChange = (value: any) => {
        console.log('value', value)
        setSelectedTable(value)
    }

    useEffect(() => {
        switch (selectedTable) {
            case 'Tasks':
                console.log('tasks')
                setTableData(userTasks)
                break
            case 'Events':
                console.log('Events')
                setTableData(userEvents)
                break
            case 'Projects':
                console.log('Projects')
                setTableData(userProjects)
                break
            case 'Intakes':
                console.log('Intakes')
                setTableData(userIntakes)
                break
            }
    }, [selectedTable])



    return (
        <div className='user-tables-component'>
            User Tables
            <div className='user-tables-topbar mb-2'>
                <TableTopBar
                    onTableChange={onTableChange}
                    selectedTable={selectedTable}
                />
            </div>
            <div className='user-tables-table-wrapper'>
                <MainTable
                    tableData={tableData}
                />
            </div>
        </div>
    )
}