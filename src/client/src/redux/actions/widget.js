import * as types from '../types'

const widgetActions = {
    showTaskWidget: () => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.SHOW_TASK_WIDGET }))
        }
    },
    hideTaskWidget: () => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.HIDE_TASK_WIDGET }))
        }
    },
    showEventWidget: () => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.SHOW_EVENT_WIDGET  }))
        }
    },
    hideEventWidget: () => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.HIDE_EVENT_WIDGET }))
        }
    },
    showProjectWidget: () => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.SHOW_PROJECT_WIDGET  }))
        }
    },
    hideProjectWidget: () => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.HIDE_PROJECT_WIDGET }))
        }
    },
    showNoteWidget: () => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.SHOW_NOTE_WIDGET  }))
        }
    },
    hideNoteWidget: () => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.HIDE_NOTE_WIDGET }))
        }
    },
}

export default widgetActions
