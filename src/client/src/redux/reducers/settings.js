import * as types from '../types'
import initialState from '../initialState'

export default function settingsReducer(state = initialState.settings, action) {
    switch (action.type) {
        case types.SHOW_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case types.HIDE_LOADING: {
            return {
                ...state,
                loading: false,
            }
        }
        case types.SET_THEME: {
            return {
                ...state,
                theme: action.payload,
            }
        }
        default:
            return state
    }
}
