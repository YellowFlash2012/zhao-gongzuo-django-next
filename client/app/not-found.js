"use client"
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="page-not-found-wrapper">
            <Image
                src="/images/not-found.svg"
                height="550"
                width="550"
                alt="404_not_found"
            />

            <h5>
                Page Not Found. Go to <Link href="/">Homepage</Link>{" "}
            </h5>
        </div>
    );
};
export default NotFound;
