import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const eventService = {
    getEvents,
    getUserEvents,
    createEvent,
    getAnEvent,
    updateEvent,
    deleteEvent,
}

async function getEvents() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/event/get_all_events`)
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

async function getUserEvents(user_id) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/event/user/${user_id}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function createEvent(to_add) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/event/create_calendar_event`, to_add)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getAnEvent(id_to_get) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/event/${id_to_get}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function updateEvent(id_to_update, new_event_obj) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/event/${id_to_update}`, new_event_obj)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function deleteEvent(id_to_delete) {
    return new Promise((resolve, reject) => {
        apiInstance
            .delete(`/event/${id_to_delete}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}