"use client"
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {

    const user = "james";

    const logoutHandler = () => { }
    
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
                        <div className="dropdown ml-3">
                            <a
                                className="btn dropdown-toggle mr-4"
                                id="dropDownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {/* <span>Hi, {user.first_name}</span>{" "} */}
                            </a>

                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropDownMenuButton"
                            >
                                <Link href="/employeer/jobs">
                                    <span className="dropdown-item">My Jobs</span>
                                </Link>

                                <Link href="/me/applied">
                                    <span className="dropdown-item">
                                        Jobs Applied
                                    </span>
                                </Link>

                                <Link href="/me">
                                    <span className="dropdown-item">Profile</span>
                                </Link>

                                <Link href="/upload/resume">
                                    <span className="dropdown-item">
                                        Upload Resume
                                    </span>
                                </Link>

                                <Link href="/">
                                    <span
                                        className="dropdown-item text-danger"
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        !loading && (
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
