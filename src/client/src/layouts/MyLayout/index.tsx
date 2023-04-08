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


type Props = {

}

export const MyLayout : React.FC<Props> = ({

}) => {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false)
	const taskWidget = useSelector((state: any) => state.widgets?.taskWidget ?? [])
    const eventWidget = useSelector((state: any) => state.widgets?.eventWidget ?? [])
    const projectWidget = useSelector((state: any) => state.widgets?.projectWidget ?? [])
    const noteWidget = useSelector((state: any) => state.widgets?.noteWidget ?? [])


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

        return () => {
            Mousetrap.unbind('alt+1')
            Mousetrap.unbind('alt+2')
            Mousetrap.unbind('alt+3')
            Mousetrap.unbind('alt+4')
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

    return (
        <div className='my-layout'>
            {taskWidget && <TaskWidget/>}
            {eventWidget && <EventWidget/>}
            {projectWidget?.open && <ProjectWidget/>}
            {noteWidget && <NoteWidget/>}
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