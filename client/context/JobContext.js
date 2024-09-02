"use client";

const { createContext, useState, useContext, useEffect } = require("react");
import ApplyToJob from "@/app/actions/jobs/applyToJob";
import CheckJobAppliedTo from "@/app/actions/jobs/checkJobAppliedTo";
import GetTopicStats from "@/app/actions/jobs/getTopicStats";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const [applied, setApplied] = useState(false);

    const [stats, setStats] = useState([]);
    

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

            const res = await CheckJobAppliedTo(id);

            console.log(res);

            if (res) {
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
    const getTopicStats = async (topic) => {
        try {
            // console.log(username);
            setIsLoading(true);

            const res = await GetTopicStats(topic);

            // console.log(res);

            if (res) {
                setIsLoading(false);

                setStats(res?.data)

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



    return (
        <JobContext.Provider
            value={{
                isLoading,
                error,
                message,
                applied,
                stats,
                applyToJob,
                checkJobAppliedTo,
                getTopicStats,
            }}
        >
            {children}
        </JobContext.Provider>
    );
};

export const useGlobalJobContext = () => {
    return useContext(JobContext);
};
