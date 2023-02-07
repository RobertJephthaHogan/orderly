import { taskService } from '../../services/task.service'
import * as types from '../types'



const taskActions = {
    setToDos: (user_id) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                taskService
                .getUserTasks(user_id)
                .then((response) => {
                    if (response) {
                        dispatch({
                            type: types.SET_TASKS,
                            payload: response?.data,
                        })
                        resolve(response)
                    } else {
                        reject()
                    }
                }).catch((error) => reject(error))
            })
        }
    },

    add: (payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                taskService
                .createTask(payload)
                .then((resp) => {
                    if (resp) {
                        dispatch({ type: types.ADD_TASK, payload: resp?.data })
                        resolve(resp)
                    } else {
                        reject()
                    }
                })
                .catch((error) => reject(error))
            })
        }
    },

    delete: (taskID) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return taskService
                    .deleteTask(taskID)
                    .then((data) => {
                        dispatch({ type: types.DELETE_TASK, taskID })
                        return resolve(data)
                    })
                    .catch((error) => reject(error))
            })
        }
    },

    update: (taskID, payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return taskService
                    .updateTask(taskID, payload)
                    .then((resp) => {
                        if (resp) {
                            dispatch({ type: types.UPDATE_TASK, payload: resp?.data })
                            return resolve(resp?.data)
                        }
                        return reject()
                    })
                    .catch((error) => reject(error))
            })
        }
    },
}


export default taskActions
