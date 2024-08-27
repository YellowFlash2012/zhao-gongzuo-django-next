"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useGlobalAuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const { isLoading, error, isAuthenticated, login, user } = useGlobalAuthContext();

    const loginHandler = async (e) => {
        e.preventDefault()

        // console.log(email, password);

        login({username:email, password})
    }

    useEffect (() => {
        if (error) {
            toast.error(error)
            
        }

        if (isAuthenticated && !isLoading && user) {
            toast.success(`Welcome back, ${user?.first_name}`)
            router.push("/")
        }
    },[error, isAuthenticated, isLoading])

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
                            src="/images/login.svg"
                            alt="login"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>
                <div className="right">
                    <div className="rightContentWrapper">
                        <div className="headerWrapper">
                            <h2> LOGIN</h2>
                        </div>
                        <form className="form" onSubmit={loginHandler}>
                            <div className="inputWrapper">
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
                                    <i aria-hidden className="fas fa-key"></i>
                                    <input
                                        type="password"
                                        placeholder="Enter Your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div className="loginButtonWrapper">
                                <button type="submit" className="loginButton">
                                    {isLoading ? "Authenticating..." : "Login"}
                                </button>
                            </div>
                            <p
                                style={{ textDecoration: "none" }}
                                className="signup"
                            >
                                New to Jobbee?{" "}
                                <Link href="/register">Create an account</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
