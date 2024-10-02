import http from "./axioscontext"

const createCategorie = (data) => {
    return http.post('/categorie/', data)
}

const getCategorie = () => {
    return http.get('/categorie/')
}

const getCategoriebyId = (id) => {
    return http.get(`/categorie/${id}`)
}

const updateCategorie = (id, data) => {
    return http.put(`/categorie/${id}`, data)
}

const deleteCategorie = (id) => {
    return http.delete(`/categorie/${id}`)
}

export default{createCategorie,getCategorie,getCategoriebyId,updateCategorie,deleteCategorie}