import React, { useState } from 'react'
import { MyLayoutHeader } from './Header'
import { MyLayoutSidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'
import './styles.css'


type Props = {

}

export const MyLayout : React.FC<Props> = ({

}) => {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false)

    return (
        <div className='my-layout'>
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