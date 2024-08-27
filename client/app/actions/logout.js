"use server";

import { cookies } from "next/headers";

async function LogoutUser() {
    cookies().delete("access");

    return {
        success: true,
    };
}

export default LogoutUser;
