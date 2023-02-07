import { useHistory } from 'react-router-dom'
import * as types from '../types'

const userActions = {
    login: (user = {}) => {
        return (dispatch) => {
            dispatch({ type: types.LOGIN, payload: user })
            localStorage.setItem("user", JSON.stringify(user));
        }
    },
    logout: () => {
        return (dispatch) => {
            localStorage.removeItem('user')
            dispatch({ type: types.LOGOUT })
            //window.location.reload()
        }
    },
    tokenRefreshOn: () => {
        return (dispatch) => {
            dispatch({ type: types.REFRESHON })
        }
    },
    tokenRefreshOff: () => {
        return (dispatch) => {
            dispatch({ type: types.REFRESHOFF })
        }
    },
    updateTokens: (payload) => {
        return (dispatch) => {
            dispatch({ type: types.REFRESHTOKEN, payload })
        }
    },
}

export default userActions
