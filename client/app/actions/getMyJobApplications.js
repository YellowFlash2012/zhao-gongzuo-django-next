"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function GetMyJobApplications() {
    const cookieStore = cookies();
    const access = cookieStore.get("access");

    // console.log(access);
    try {
        const res = await axios.get(
            `${process.env.API_URL}/api/v1/jobs/profile/jobs/applied`,
            {
                headers: {
                    Authorization: `Bearer ${access?.value}`,
                },
            }
        );

    

        if (res.data) {

            return 
                res?.data
        } else {
            return {
                error: "Something went wrong!",
            };
        }
    } catch (error) {
        // console.error(error);

        return {
            error: error?.response && error?.response?.data?.error,
        };
    }
}

export default GetMyJobApplications;
