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
        route: '/events'
    },
    {
        key: 'user-tasks',
        icon: <BarsOutlined />,
        label: 'User Tasks',
        route: '/tasks'
    },
    {
        key: 'user-projects',
        icon: <SnippetsOutlined />,
        label: 'User Projects',
        route: '/projects'
    },
    {
        key: 'user-notes',
        icon: <FileOutlined />,
        label: 'User Notes',
        route: '/notes'
    },
    {
        key: 'user-dashboard',
        icon: <DashboardOutlined />,
        label: 'User Dashboard',
        route: '/dashboard'
    },
]