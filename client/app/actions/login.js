"use server";

import axios from "axios";
import { cookies } from "next/headers";

async function LoginUser(username, password) {
    // console.log(username, password);
    try {
        const res = await axios.post(`${process.env.API_URL}/api/token/`, {
            username,
            password,
        });

        // console.log(resp);

        if (res?.data?.access) {
            cookies().set("access", res.data.access);
            
            return {
                success: true,
            };
        } else {
            return {
                error: "Authentication failed!",
            };
        }
    } catch (error) {
        // console.error(error);

        return {
            error: error?.response && error?.response?.data?.error,
        };
    }
}

export default LoginUser;
