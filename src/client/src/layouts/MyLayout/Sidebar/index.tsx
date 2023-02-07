import { AppstoreOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import { newMenuItems } from './MenuItems';
import { SidebarMenuRenderer } from './SidebarMenuRenderer';
import './styles.css'

type Props = {
    isSidebarCollapsed?: any,
    setIsSidebarCollapsed?: any
}

export const MyLayoutSidebar : React.FC<Props> = ({
    isSidebarCollapsed,
    setIsSidebarCollapsed
}) => {

    useEffect(() => {
        const sidebar = document?.getElementById('sidebar')
        if (isSidebarCollapsed) {
            if (sidebar) {
                sidebar.style.width = '50px'
            }
        } else if (!isSidebarCollapsed) {
            if (sidebar) {
                sidebar.style.width = '200px'
            }
        }
    }, [isSidebarCollapsed])




    return (
        <div 
            className='sidebar'
            id='sidebar'
        >
            <div 
                style={{
                    height: '45px'
                }}
            >
                {
                !isSidebarCollapsed 
                ? (
                    <div className='sidebar-title-wrapper'>
                        <h3>Control Panel</h3>
                    </div>
                ) : (
                    <div className='sidebar-title-wrapper pt-1'>
                        <AppstoreOutlined/>
                    </div>
                )
            }
            </div>
            <div className='sidebar-divider'/>
            <SidebarMenuRenderer
                data={newMenuItems}
                isSidebarCollapsed={isSidebarCollapsed}
            />
            <div
                style={{
                    bottom:0
                }}
            >

                {/* <Editor
                    triggerCaption={'Task Editor'}
                    editorType={'task'}
                />
                <Editor
                    triggerCaption={'Events Editor'}
                    editorType={'event'}
                />
                <Editor
                    triggerCaption={'Projects Editor'}
                    editorType={'project'}
                /> */}
            </div>
        </div>
    )
}


