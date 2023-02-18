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
                        dispatch({ type: types.ADD_PROJECT, payload: resp?.data })
                        resolve(resp?.data)
                    } else {
                        reject()
                    }
                })
                .catch((error) => reject(error))
            })
        }
    },

    delete: (projectID) => {
        return async (dispatch) => {
            return new Promise( async function (resolve, reject) {
                return projectService
                    .deleteProject(projectID)
                    .then((resp) => {
                        dispatch({ type: types.DELETE_PROJECT, projectID })
                        return resolve(resp)
                    })
                    .catch((error) => reject(error))
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


export default projectActions
