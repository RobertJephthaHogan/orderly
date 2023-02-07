import reject from 'lodash/reject'
import * as types from '../types'

const settingsActions = {
    showLoading: () => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.SHOW_LOADING }))
        }
    },
    hideLoading: () => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.HIDE_LOADING }))
        }
    },
    setTheme: (theme) => {
        return (dispatch) => {
            Promise.resolve(dispatch({ type: types.SET_THEME, payload: theme }))
        }
    },
}

export default settingsActions
