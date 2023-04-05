import { combineReducers } from 'redux'
import userReducer from './user'
import taskReducer from './tasks'
import eventReducer from './event'
import projectReducer from './project'
import noteReducer from './note'
import settingsReducer from './settings'
import initialState from '../initialState'

import * as types from '../types'
import widgetReducer from './widget'


const appReducers = combineReducers({
  user:  userReducer,
  tasks: taskReducer,
  events: eventReducer,
  projects: projectReducer,
  notes: noteReducer,
  settings: settingsReducer,
  widgets: widgetReducer,
})


const rootReducer = (state, action) => {
  switch (action.type) {
      case types.LOGOUT_SUCCESS:
          return appReducers(
              {
                  ...initialState,
              },
              action
          )
      default:
          return appReducers(state, action)
  }
}

export default rootReducer