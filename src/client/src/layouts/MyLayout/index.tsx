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

        Mousetrap.bind('alt+t', () => {
            toggleTaskWidget()
        })

        return () => {
            Mousetrap.unbind('alt+t')
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


    return (
        <div className='my-layout'>
            {taskWidget && <TaskWidget/>}
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