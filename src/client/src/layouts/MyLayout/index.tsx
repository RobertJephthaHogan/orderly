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

        return () => {
            Mousetrap.unbind('alt+1')
            Mousetrap.unbind('alt+2')
            Mousetrap.unbind('alt+3')
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
        if (!projectWidget) {
            store.dispatch(widgetActions.showProjectWidget())
        }
        if (projectWidget) {
            store.dispatch(widgetActions.hideProjectWidget())
        }
    }


    return (
        <div className='my-layout'>
            {taskWidget && <TaskWidget/>}
            {eventWidget && <EventWidget/>}
            {projectWidget && <ProjectWidget/>}
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