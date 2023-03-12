import React from 'react'
import { useNavigate } from 'react-router-dom';




type Props = {
    data?: any
    isSidebarCollapsed?: any
}

export const SidebarMenuRenderer : React.FC<Props> = ({
    data,
    isSidebarCollapsed
}) => {

    const navigate = useNavigate();

    const navTo = (target: any) => {
        navigate(target)
    }

    let menuItems = data?.map((child: any) => {
        return (
            <div 
                data-menu-item={child}
                onClick={() => navTo(child.route)}
                className="child-menu-node"
                key={`${child.label}`}
            >
                <span style={{cursor: 'pointer'}}>
                    {
                        isSidebarCollapsed ? (
                            <div 
                                className='flex content-center'
                                style={{
                                    height:'24px',
                                    position: 'relative',
                                    margin:'auto'
                                }}
                            >
                                <div>
                                    {child.icon}
                                </div>
                            </div>
                        ) : (
                            <div
                                style={{height:'24px'}}>
                                {child.label}
                            </div>
                        )
                    }
                    
                </span>
            </div>
        )
    }) || []

    return (
        <div>
            {menuItems}
        </div>
    )
}