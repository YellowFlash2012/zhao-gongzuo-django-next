"use server";

import axios from "axios";
import { cookies } from "next/headers";

async function GetUser() {
    const cookieStore = cookies();
    const access = cookieStore.get("access");

    // console.log(access);
    try {
        const res = await axios.get(`${process.env.API_URL}/api/v1/users/profile`, {
            headers: {
                "Authorization":`Bearer ${access?.value}`
            }
        });

        // console.log(res.data.data);

        if (res.data) {

            return {
                user: res?.data?.data,
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

export default GetUser;
