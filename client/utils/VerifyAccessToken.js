"use server"

import axios from "axios"
import { cookies } from "next/headers"


export const VerifyAccessToken = async () => {
    const cookieStore = cookies();
    const access = cookieStore.get("access");

    try {
        const res = await axios.post(`${process.env.API_URL}/api/token/verify/`, {
            token:`${access?.value}`
        })

        console.log(res.status);

        if (res.status===200) {
            return true
        } 
        return false
        


    } catch (error) {
        return false
    }
}