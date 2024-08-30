"use client";

import Link from "next/link";
import Image from "next/image";
import { useGlobalAuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

const Header = () => {
    const { user, isLoading, logoutUser } = useGlobalAuthContext();

    const logoutHandler = () => {
        logoutUser()

        toast.success(`See you next time, ${user.first_name}`)
    };

    return (
        <div className="navWrapper">
            <div className="navContainer">
                <Link href="/">
                    <div className="logoWrapper">
                        <div className="logoImgWrapper">
                            <Image
                                width="50"
                                height="50"
                                src="/images/logo.png"
                                alt=""
                            />
                        </div>
                        <span className="logo1">Job</span>
                        <span className="logo2">bee</span>
                    </div>
                </Link>
                <div className="btnsWrapper">
                    <Link href="/employeer/jobs/new">
                        <button className="postAJobButton">
                            <span>Post A Job</span>
                        </button>
                    </Link>
                    {user ? (
                        <div className="dropdown ms-3">
                            <button
                                className="btn btn-secondary dropdown-toggle me-4"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Hi, {user?.first_name}
                            </button>

                            <ul className="dropdown-menu">
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        href="/employeer/jobs"
                                    >
                                        My Jobs
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="dropdown-item"
                                        href="/profile/applied"
                                    >
                                        Jobs Applications
                                    </Link>
                                </li>

                                <li>
                                    <Link className="dropdown-item" href="/profile">
                                        Profile
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="dropdown-item"
                                        href="/upload/resume"
                                    >
                                        Upload Resume
                                    </Link>
                                </li>

                                <li>
                                    <span
                                        className="dropdown-item text-danger"
                                        onClick={logoutHandler}
                                        style={{cursor:"pointer"}}
                                    >
                                        Logout
                                    </span>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        !isLoading && (
                            <Link href="/login">
                                <button className="loginButtonHeader">
                                    <span>Login</span>
                                </button>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
export default Header;
