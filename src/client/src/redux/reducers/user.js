import * as types from '../types'
import initialState from '../initialState'

export default function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state, 
                accessToken: action?.payload?.access_token,
                data: action?.payload?.data
            }
        case types.LOGOUT:
            return initialState
        case types.REFRESHON:
            return { ...state, tokenRefreshing: true }
        case types.REFRESHOFF:
            return { ...state, tokenRefreshing: false }
        case types.REFRESHTOKEN:
            return action.payload
        default:
            return state
    }
}
