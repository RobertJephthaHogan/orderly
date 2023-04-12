import { openNotification } from '../../helpers/notifications'
import * as types from '../types'
import { projectService } from '../../services/project.service'



const projectActions = {
    setProjects: (user_id) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                projectService
                .getUserProjects(user_id)
                .then((response) => {
                    if (response) {
                        dispatch({
                            type: types.SET_PROJECTS,
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
                projectService
                .createProject(payload)
                .then((resp) => {
                    if (resp) {
                        openNotification(
                            resp?.data?.response_type,
                            `Project ${resp?.data?.data?._id} Created Successfully`
                        )
                        dispatch({ type: types.ADD_PROJECT, payload: resp?.data })
                        resolve(resp?.data)
                    } else {
                        reject()
                    }
                })
                .catch((error) => {
                    console.error('Error Adding Project:', error)
                    openNotification(
                        error?.data?.response_type,
                        `Error Creating Project ${error?.data?.data?._id}`
                    )
                    reject(error)
                })
            })
        }
    },

    delete: (projectID) => {
        return async (dispatch) => {
            return new Promise( async function (resolve, reject) {
                return projectService
                    .deleteProject(projectID)
                    .then((resp) => {
                        if (resp) {
                            openNotification(
                                resp?.data?.response_type,
                                `Project ${projectID} Deleted Successfully`
                            )
                            dispatch({ type: types.DELETE_PROJECT, projectID })
                            return resolve(resp)
                        } else {
                            reject()
                        }
                    })
                    .catch((error) => {
                        console.error('Error Deleting Project:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Deleting Project ${projectID}`
                        )
                        reject(error)
                    })
            })
        }
    },

    update: (projectID, payload) => {
        return async (dispatch) => {
            return new Promise(async function (resolve, reject) {
                return projectService
                    .updateProject(projectID, payload)
                    .then((resp) => {
                        if (resp) {
                            openNotification(
                                resp?.data?.response_type,
                                `Project ${projectID} Updated Successfully`
                            )
                            dispatch({ type: types.UPDATE_PROJECT, payload: resp?.data })
                            resolve(resp?.data)
                        } else {
                            reject()
                        }
                    })
                    .catch((error) => {
                        console.error('Error Updating Project:', error)
                        openNotification(
                            error?.data?.response_type,
                            `Error Updating Project ${projectID} `
                        )
                        reject(error)
                    })
            })
        }
    },
}


export default projectActions
