"use client";

const { createContext, useState, useContext, useEffect } = require("react");
import ApplyToJob from "@/app/actions/jobs/applyToJob";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const [applied, setApplied] = useState(false);
    

    const router = useRouter();

    const applyToJob = async (id) => {
        try {
            // console.log(username);
            setIsLoading(true);

            const res = await ApplyToJob(id);

            // console.log(res);

            if (res?.applied === true) {
                setIsLoading(false);

                setApplied(true);

                setMessage(res?.message)
            }
        } catch (error) {
            setIsLoading(false);
            setError(
                error.response &&
                    (error.response.data.detail || error.response.data.error)
            );
        }
    };
    const checkJobAppliedTo = async (id) => {
        try {
            // console.log(username);
            setIsLoading(true);

            const res = await checkJobAppliedTo(id);

            // console.log(res);

            if (res?.data?.data === true) {
                setIsLoading(false);

                setApplied(true);

                setMessage(res?.data?.message)
            }
        } catch (error) {
            setIsLoading(false);
            setError(
                error.response &&
                    (error.response.data.detail || error.response.data.error)
            );
        }
    };



    return (
        <JobContext.Provider
            value={{
                isLoading,
                error,
                message,
                applied,
                applyToJob,
                checkJobAppliedTo,
            }}
        >
            {children}
        </JobContext.Provider>
    );
};

export const useGlobalJobContext = () => {
    return useContext(JobContext);
};
