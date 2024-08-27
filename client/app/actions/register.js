"use server";

import axios from "axios";
import { cookies } from "next/headers";

async function RegisterUser(firstName, lastName, email, password) {
    // console.log(username, password);
    try {
        const res = await axios.post(`${process.env.API_URL}/api/v1/users/`, {
            first_name: firstName,
            last_name:lastName,
            email,
            password,
        });

        // console.log(res.data);

        if (res?.data?.success) {

            return {
                success: res?.data?.success,
                message: res?.data?.message,
            };
        } else {
            return {
                error: "Registration failed!",
            };
        }
    } catch (error) {
        // console.error(error);

        return {
            error: error?.response && error?.response?.data?.error,
        };
    }
}

export default RegisterUser;
