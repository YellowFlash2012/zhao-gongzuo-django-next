"use client";

import { useGlobalAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateProfile = () => {
    const { isLoading, error, user, message, IsAuthenticatedUser, updateUser } =
        useGlobalAuthContext();
    

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const updateProfileHandler = (e) => {
        e.preventDefault();

        // console.log(email, password);

        updateUser({ firstName, lastName, email, password });

        toast.success(message)


    };


    useEffect(() => {

        IsAuthenticatedUser()

        if (user) {
            setFirstName(user?.first_name)
            setLastName(user?.last_name)
            setEmail(user?.email)
        }

        if (error) {
            toast.error(error);
        }

        // if (!isLoading && !error) {
        //     toast.success(message);
        // }
    }, [error]);

    return (
    
            <div className="modalMask">
                <div className="modalWrapper">
                    <div className="left">
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                            }}
                        >
                            <Image
                                src="/images/profile.svg"
                                alt="register"
                                layout="fill"
                            />
                        </div>
                    </div>
                    <div className="right">
                        <div className="rightContentWrapper">
                            <div className="headerWrapper">
                                <h2> Update Your Information</h2>
                            </div>
                            <form
                                className="form"
                                onSubmit={updateProfileHandler}
                            >
                                <div className="inputWrapper">
                                    <div className="inputBox">
                                        <i
                                            aria-hidden
                                            className="fas fa-user"
                                        ></i>
                                        <input
                                            type="text"
                                            placeholder="Enter First Name"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="inputBox">
                                        <i
                                            aria-hidden
                                            className="fas fa-user-tie"
                                        ></i>
                                        <input
                                            type="text"
                                            placeholder="Enter Last name"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="inputBox">
                                        <i
                                            aria-hidden
                                            className="fas fa-envelope"
                                        ></i>
                                        <input
                                            type="email"
                                            placeholder="Enter Your Email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            pattern="\S+@\S+\.\S+"
                                            title="Your email is invalid"
                                            required
                                        />
                                    </div>
                                    <div className="inputBox">
                                        <i
                                            aria-hidden
                                            className="fas fa-key"
                                        ></i>
                                        <input
                                            type="password"
                                            placeholder="Enter Your Password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            minLength={6}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="registerButtonWrapper">
                                    <button
                                        type="submit"
                                        className="registerButton"
                                    >
                                        {isLoading ? "Updating..." : "Update"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
    );
};
export default UpdateProfile;
