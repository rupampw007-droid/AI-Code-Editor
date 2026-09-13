import { api } from "../utils/axios";

export const logout = async () => {
    try {
        const {data} = await api.post('/api/auth/logout')
        console.log(data)
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}