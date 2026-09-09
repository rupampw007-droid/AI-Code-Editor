import { api } from "../utils/axios";

export const login = async (token) => {
    try {
        const {data} = await api.post('/api/auth/login', {token})
        console.log(data)
    } catch(err) {
        console.log(err)
        return null
    }
}