"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";

import { useGlobalAuthContext } from "@/context/AuthContext";

const UploadResume = () => {
    const [resume, setResume] = useState(null);

    const { isLoading, error, message, uploadResume, user } = useGlobalAuthContext();

    const onChange = (e) => {
        setResume(e.target.files[0])
    }

    const uploadResumeHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        
        formData.append("resume", resume)

        uploadResume(formData)

        toast.success(message)
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    },[error, user])
    
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
                            src="/images/resume-upload.svg"
                            alt="resume"
                            layout="fill"
                        />
                    </div>
                </div>
                <div className="right">
                    <div className="rightContentWrapper">
                        <div className="headerWrapper">
                            <h3> UPLOAD RESUME </h3>
                        </div>
                        <form className="form" onSubmit={uploadResumeHandler}>
                            <div className="inputWrapper">
                                <div className="inputBox">
                                    <i
                                        aria-hidden
                                        className="fas fa-upload"
                                    ></i>
                                    <input
                                        type="file"
                                        name="resume"
                                        id="customFile"
                                        accept="application/pdf"
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>

                            {user && user.resume && (
                                <>
                                    <h4 className="text-center my-3">OR</h4>

                                    <Link
                                        href={`https://jobbee.s3.amazonaws.com/${user.resume}`}
                                    >
                                        <a
                                            className="text-success text-center ml-4"
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <b>
                                                <i
                                                    aria-hidden
                                                    className="fas fa-download"
                                                ></i>{" "}
                                                Download Your Resume
                                            </b>
                                        </a>
                                    </Link>
                                </>
                            )}

                            <div className="uploadButtonWrapper">
                                <button type="submit" className="uploadButton">
                                    {isLoading ? "Uploading..." : "Upload"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UploadResume;
