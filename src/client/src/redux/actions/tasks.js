import { openNotification } from '../../helpers/notifications'
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
                        openNotification(
                            resp?.data?.response_type,
                            `Task ${resp?.data?.data?._id} Created Successfully`
                        )
                        dispatch({ type: types.ADD_TASK, payload: resp?.data })
                        resolve(resp)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error('Error Adding Task:', error)
                    openNotification(
                        error?.data?.response_type,
                        `Error Creating Task ${error?.data?.data?._id}`
                    )
                    reject(error)
                })
            })
        }
    },

    delete: (taskID) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return taskService
                    .deleteTask(taskID)
                    .then((resp) => {
                        openNotification(
                            resp?.data?.response_type,
                            `Task ${taskID} Deleted Successfully`
                        )
                        dispatch({ type: types.DELETE_TASK, taskID })
                        return resolve(resp)
                    })
                    .catch((error) => {
                        console.error('Error Deleting Task:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Deleting Task ${taskID}`
                        )
                        reject(error)
                    })
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
                            openNotification(
                                resp?.data?.response_type,
                                `Task ${taskID} Updated Successfully`
                            )
                            dispatch({ type: types.UPDATE_TASK, payload: resp?.data })
                            resolve(resp)
                        }
                        return reject()
                    })
                    .catch((error) => {
                        console.error('Error Updating Task:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Updating Task ${taskID} `
                        )
                        reject(error)
                    })
            })
        }
    },

}


export default taskActions
