"use client";

const { createContext, useState, useContext, useEffect } = require("react");
import GetMyJobApplications from "@/app/actions/getMyJobApplications";
import AddNewJob from "@/app/actions/jobs/addNewJob";
import ApplyToJob from "@/app/actions/jobs/applyToJob";
import CheckJobAppliedTo from "@/app/actions/jobs/checkJobAppliedTo";
import DeleteJob from "@/app/actions/jobs/employer/deleteJob";
import GetAllJobsOfAnEmployer from "@/app/actions/jobs/employer/getAllJobs";
import UpdateJob from "@/app/actions/jobs/employer/updateJob";
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
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);
    const [myApplications, setMyApplications] = useState([]);
    

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
    
    const getMyJobApplications = async () => {
        try {
            // console.log(username);
            setIsLoading(true);

            const res = await GetMyJobApplications()

            // console.log(res);

            if (res) {
                setIsLoading(false);

                setMyApplications(res?.data)

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

    const addNewJob = async (data) => {
        try {
            // console.log(username);
            setIsLoading(true);

            const res = await AddNewJob(data);

            // console.log(res);

            if (res) {
                setIsLoading(false);

                setMessage(res?.message);
            }
        } catch (error) {
            setIsLoading(false);
            setError(
                error.response &&
                    (error.response.data.detail || error.response.data.error)
            );
        }
    };
    
    const updateJobByEmployer = async (id, data) => {
        try {
            // console.log(username);
            setIsLoading(true);

            const res = await UpdateJob(id,data);

            // console.log(res);

            if (res) {
                setIsLoading(false);

                setJob(res?.data)

                setMessage(res?.message);
            }
        } catch (error) {
            setIsLoading(false);
            setError(
                error.response &&
                    (error.response.data.detail || error.response.data.error)
            );
        }
    };

    const getAllJobsOfAnEmployer = async () => {
        try {
            // console.log(username);
            setIsLoading(true);

            const res = await GetAllJobsOfAnEmployer();

            // console.log(res);

            if (res) {
                setIsLoading(false);

                setJobs(res?.data);

    
            }
        } catch (error) {
            setIsLoading(false);
            setError(
                error.response &&
                    (error.response.data.detail || error.response.data.error)
            );
        }
    };
    
    const deleteJobHandler = async (id) => {
        try {
            // console.log(username);
            setIsLoading(true);

            const res = await DeleteJob(id);

            // console.log(res);

            if (res) {
                setIsLoading(false);

                setMessage(res?.message);
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
                myApplications,
                applyToJob,
                checkJobAppliedTo,
                getTopicStats,
                getMyJobApplications,
                addNewJob,
                getAllJobsOfAnEmployer,
                updateJobByEmployer,
                deleteJobHandler,
            }}
        >
            {children}
        </JobContext.Provider>
    );
};

export const useGlobalJobContext = () => {
    return useContext(JobContext);
};
