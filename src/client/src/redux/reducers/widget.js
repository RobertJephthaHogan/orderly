import * as types from '../types'
import initialState from '../initialState'

export default function widgetReducer(state = initialState.widgets, action) {
    switch (action.type) {
        case types.SHOW_TASK_WIDGET: {
            return {
                ...state,
                taskWidget: true,
            }
        }
        case types.HIDE_TASK_WIDGET: {
            return {
                ...state,
                taskWidget: false,
            }
        }
        case types.SHOW_EVENT_WIDGET: {
            return {
                ...state,
                eventWidget: true,
            }
        }
        case types.HIDE_EVENT_WIDGET: {
            return {
                ...state,
                eventWidget: false,
            }
        }
        case types.SHOW_PROJECT_WIDGET: {
            return {
                ...state,
                projectWidget: true,
            }
        }
        case types.HIDE_PROJECT_WIDGET: {
            return {
                ...state,
                projectWidget: false,
            }
        }
        case types.SHOW_NOTE_WIDGET: {
            return {
                ...state,
                noteWidget: true,
            }
        }
        case types.HIDE_NOTE_WIDGET: {
            return {
                ...state,
                noteWidget: false,
            }
        }
        default:
            return state
    }
}
