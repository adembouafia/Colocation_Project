import http from "./axioscontext"


const signup = (data) => {
    return http.post('/auth/signup', data)
}

const signin = (data) => {
    return http.post('/auth/signin', data)
}


const forget = (data) => {
    return http.post('/auth/forget', data)
}

const reset = (data,token) => {
    return http.post(`/auth/${token}`, data)
}

export default{signup,signin,forget,reset}