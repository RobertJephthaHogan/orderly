import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const userService = {
    createNewUser,
    loginUser,
    getUser,
    updateUser,
}

function createNewUser(new_user_data) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/user/new`, new_user_data)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

function loginUser(login_data) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/user/login`, login_data)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

function getUser(userID) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/user/getUser`, userID)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

function updateUser(userID, updatedUserObj) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/user/${userID}`, updatedUserObj)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}