import { 
    AuditOutlined,
    BarsOutlined, 
    CalendarOutlined, 
    CheckOutlined, 
    DashboardOutlined, 
    FileOutlined, 
    ReconciliationOutlined, 
    RocketOutlined, 
    SnippetsOutlined,
    TableOutlined, 
} from "@ant-design/icons"



export const newMenuItems: any = [
    {
        key: 'user-dashboard',
        icon: <DashboardOutlined />,
        label: 'User Dashboard',
        route: '/dashboard',
        menuId: 'user-dashboard-menu-item',
    },
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
        key: 'user-agenda',
        icon: <AuditOutlined />,
        label: 'User Agenda',
        route: '/agenda',
        menuId: 'user-agenda-menu-item',
    },
    {
        key: 'user-checklists',
        icon: <CheckOutlined />,
        label: 'User Checklists',
        route: '/checklists',
        menuId: 'user-checklists-menu-item',
    },
    {
        key: 'user-nutrition',
        icon: <ReconciliationOutlined />,
        label: 'User Nutrition',
        route: '/nutrition',
        menuId: 'user-nutrition-menu-item',
    },
    {
        key: 'user-exercise',
        icon: <RocketOutlined />,
        label: 'User Exercise',
        route: '/exercise',
        menuId: 'user-exercise-menu-item',
    },
    {
        key: 'user-tables',
        icon: <TableOutlined />,
        label: 'User Tables',
        route: '/tables',
        menuId: 'user-tables-menu-item',
    },
]