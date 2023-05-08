export default {
    user: {
        data: {},
        accessToken: '',
        refreshToken: ''
    },
    tasks: [],
    events: [],
    projects: [],
    notes: [],
    checklists: [],
    agendas: [],
    settings: {
        loading: false,
        theme: 'light',
    },
    widgets: {
        taskWidget: false,
        eventWidget: false,
        projectWidget: {
            open: false
        },
        noteWidget: false,
        checklistWidget: false,
        intakeWidget: false
    }
}
