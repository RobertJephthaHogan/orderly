import { 
    BarsOutlined, 
    CalendarOutlined, 
    DashboardOutlined, 
    FileOutlined, 
    SnippetsOutlined, 
} from "@ant-design/icons"



export const newMenuItems: any = [
    {
        key: 'user-events',
        icon: <CalendarOutlined />,
        label: 'User Events',
        route: '/events',
        menuId: 'user-events-menu-item',
    },
    {
        key: 'user-tasks',
        icon: <BarsOutlined />,
        label: 'User Tasks',
        route: '/tasks',
        menuId: 'user-tasks-menu-item',
    },
    {
        key: 'user-projects',
        icon: <SnippetsOutlined />,
        label: 'User Projects',
        route: '/projects',
        menuId: 'user-projects-menu-item',
    },
    {
        key: 'user-notes',
        icon: <FileOutlined />,
        label: 'User Notes',
        route: '/notes',
        menuId: 'user-notes-menu-item',
    },
    {
        key: 'user-dashboard',
        icon: <DashboardOutlined />,
        label: 'User Dashboard',
        route: '/dashboard',
        menuId: 'user-dashboard-menu-item',
    },
]