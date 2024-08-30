"use server"

import axios from "axios"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function UpdateUser(firstName, lastName, email, password) {
    // console.log(username, password);
    const cookieStore = cookies();
    const access = cookieStore.get("access");

    try {
        const res = await axios.post(
            `${process.env.API_URL}/api/v1/users/profile/update`,
            {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            }, {
                headers: {
                    Authorization: `Bearer ${access?.value}`
                }
            }
        );

        // console.log(res.data);

        if (res?.data?.success) {
            revalidatePath("/profile")
            return res?.data
        } else {
            return {
                error: "Profile update failed!",
            };
        }
    } catch (error) {
        // console.error(error);

        return {
            error: error?.response && error?.response?.data?.error,
        };
    }
}

export default UpdateUser;
