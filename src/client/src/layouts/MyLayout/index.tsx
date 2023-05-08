import React, { useEffect, useState } from 'react'
import { MyLayoutHeader } from './Header'
import { MyLayoutSidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'
import Mousetrap from 'mousetrap'
import './styles.css'
import { useSelector } from 'react-redux'
import TaskWidget from '../../features/widgets/TaskWidget'
import widgetActions from '../../redux/actions/widget'
import { store } from '../../redux/store'
import EventWidget from '../../features/widgets/EventWidget'
import ProjectWidget from '../../features/widgets/ProjectWidget'
import NoteWidget from '../../features/widgets/NoteWidget'
import ChecklistWidget from '../../features/widgets/ChecklistWidget'
import IntakeWidget from '../../features/widgets/IntakeWidget'


type Props = {

}

export const MyLayout : React.FC<Props> = ({

}) => {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false)
	const taskWidget = useSelector((state: any) => state.widgets?.taskWidget ?? [])
    const eventWidget = useSelector((state: any) => state.widgets?.eventWidget ?? [])
    const projectWidget = useSelector((state: any) => state.widgets?.projectWidget ?? [])
    const noteWidget = useSelector((state: any) => state.widgets?.noteWidget ?? [])
    const checklistWidget = useSelector((state: any) => state.widgets?.checklistWidget ?? [])
    const intakeWidget = useSelector((state: any) => state.widgets?.intakeWidget ?? [])


    useEffect(() => {

        Mousetrap.bind('alt+1', () => {
            toggleTaskWidget()
        })
        Mousetrap.bind('alt+2', () => {
            toggleEventWidget()
        })
        Mousetrap.bind('alt+3', () => {
            toggleProjectWidget()
        })
        Mousetrap.bind('alt+4', () => {
            toggleNoteWidget()
        })
        Mousetrap.bind('alt+5', () => {
            toggleChecklistWidget()
        })
        Mousetrap.bind('alt+6', () => {
            toggleIntakeWidget()
        })

        return () => {
            Mousetrap.unbind('alt+1')
            Mousetrap.unbind('alt+2')
            Mousetrap.unbind('alt+3')
            Mousetrap.unbind('alt+4')
            Mousetrap.unbind('alt+5')
            Mousetrap.unbind('alt+6')
        }

    })

    const toggleTaskWidget = () => {
        if (!taskWidget) {
            store.dispatch(widgetActions.showTaskWidget())
        }
        if (taskWidget) {
            store.dispatch(widgetActions.hideTaskWidget())
        }
    }

    const toggleEventWidget = () => {
        if (!eventWidget) {
            store.dispatch(widgetActions.showEventWidget())
        }
        if (eventWidget) {
            store.dispatch(widgetActions.hideEventWidget())
        }
    }

    const toggleProjectWidget = () => {
        if (!projectWidget?.open) {
            store.dispatch(widgetActions.showProjectWidget())
        }
        if (projectWidget?.open) {
            store.dispatch(widgetActions.hideProjectWidget())
        }
    }

    const toggleNoteWidget = () => {
        if (!noteWidget) {
            store.dispatch(widgetActions.showNoteWidget())
        }
        if (noteWidget) {
            store.dispatch(widgetActions.hideNoteWidget())
        }
    }
    
    const toggleChecklistWidget = () => {
        if (!checklistWidget) {
            store.dispatch(widgetActions.showChecklistWidget())
        }
        if (checklistWidget) {
            store.dispatch(widgetActions.hideChecklistWidget())
        }
    }

    const toggleIntakeWidget = () => {
        if (!intakeWidget) {
            store.dispatch(widgetActions.showIntakeWidget())
        }
        if (intakeWidget) {
            store.dispatch(widgetActions.hideIntakeWidget())
        }
    }

    return (
        <div className='my-layout'>
            {taskWidget && <TaskWidget/>}
            {eventWidget && <EventWidget/>}
            {projectWidget?.open && <ProjectWidget/>}
            {noteWidget && <NoteWidget/>}
            {checklistWidget && <ChecklistWidget/>}
            {intakeWidget && <IntakeWidget/>}
            <MyLayoutSidebar
                isSidebarCollapsed={isSidebarCollapsed}
                setIsSidebarCollapsed={setIsSidebarCollapsed}
            />
            <div className='w-100'>
                <MyLayoutHeader
                    isSidebarCollapsed={isSidebarCollapsed}
                    setIsSidebarCollapsed={setIsSidebarCollapsed}
                />
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}