import axios from 'axios'


const apiInstance = axios.create({
    // baseURL: `http://18.118.82.187/`,
    baseURL: `http://localhost:8000/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const projectService = {
    getProjects,
    getUserProjects,
    getAProject,
    createProject,
    deleteProject,
    updateProject,
}



async function getProjects() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/project/get_all_projects`)
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

async function getUserProjects(user_id) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/project/user/${user_id}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function getAProject(id_to_get) {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/project/single/${id_to_get}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function createProject(to_add) {
    return new Promise((resolve, reject) => {
        apiInstance
            .post(`/project/create_project`, to_add)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function updateProject(id_to_update, new_todo_obj) {
    return new Promise((resolve, reject) => {
        apiInstance
            .put(`/project/${id_to_update}`, new_todo_obj)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

async function deleteProject(id_to_delete) {
    return new Promise((resolve, reject) => {
        apiInstance
            .delete(`/project/${id_to_delete}`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}

