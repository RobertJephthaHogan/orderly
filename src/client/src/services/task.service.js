import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const taskService = {
    getTasks,
    getUserTasks,
    getATask,
    createTask,
    deleteTask,
    updateTask,
}


async function getTasks() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/task/get_all_tasks`)
            .then((response) => {
                const resp = response.data
                return resolve(resp)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getUserTasks(userID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/task/user/${userID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function createTask(taskData) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/task/create_task`, taskData)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getATask(taskID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/task/${taskID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function updateTask(taskID, newTaskObj) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/task/${taskID}`, newTaskObj)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function deleteTask(taskID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .delete(`/task/${taskID}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

