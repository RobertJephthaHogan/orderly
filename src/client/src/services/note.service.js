import axios from 'axios'


const apiInstance = axios.create({
    // baseURL: `http://18.118.82.187/`,
    baseURL: `http://localhost:8000/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const noteService = {
    getNotes,
    getUserNotes,
    getANote,
    createNote,
    deleteNote,
    updateNote,
}



function getNotes() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/note/get_all_notes`)
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

function getUserNotes(user_id) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/note/user/${user_id}`)
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

function createNote(to_add) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/note/create_note`, to_add)
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

function getANote(id_to_get) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/note/${id_to_get}`)
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

function updateNote(id_to_update, new_note_obj) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/note/${id_to_update}`, new_note_obj)
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

function deleteNote(id_to_delete) {
    return new Promise((resolve, reject) => {
        apiInstance
            .delete(`/note/${id_to_delete}`)
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

