import api from "@/lib/axios"

export const loginUser=async (email: string, password: string) =>{
    const response = await api.post("/auth/login", {email, password})
    return response.data
}

export const registerUser = async (username: string, email: string, password: string) =>{
    const response =await api.post("/auth/register", {username, email, password})
    return response.data
} 

export const getUser= async () => {
    const response =await api.get("/profile")
    console.log("response data: ", response)
    return response.data
}