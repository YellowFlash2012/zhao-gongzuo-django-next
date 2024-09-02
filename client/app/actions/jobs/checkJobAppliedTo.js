"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function CheckJobAppliedTo(id) {
    const cookieStore = cookies();
    const access = cookieStore.get("access");

    // console.log(access);
    try {
        const res = await axios.get(
            `${process.env.API_URL}/api/v1/jobs/${id}/check`,
            
            {
                headers: {
                    Authorization: `Bearer ${access?.value}`,
                },
            }
        );

        // console.log(res.data.data);

        if (res.data) {
            // revalidatePath("/")

            return res?.data;
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

export default ApplyToJob;
