import { api } from "../utils/axios";

export const me = async (token) => {
    try {
        const {data} = await api.get('/api/me', {token})
        console.log(data)
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}