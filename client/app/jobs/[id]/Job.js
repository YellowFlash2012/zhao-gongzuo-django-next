"use client"

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "next/navigation";

import { addCommas } from "@/utils/helpers";
import Map from "@/components/Map";
import { useGlobalJobContext } from "@/context/JobContext";
import { toast } from "react-toastify";


const Job = () => {
    const { id } = useParams();

    const [job, setJob] = useState();

    const {
        isLoading,
        error,
        message,
        applyToJob,
        applied,
        checkJobAppliedTo,
    } = useGlobalJobContext();

    // console.log(isLoading, applied);

    
    const fetchSingleJob = async() => {
        try {
            const res = await axios.get(`${process.env.API_URL}/api/v1/jobs/${id}`);
            
            // console.log(res.data);
            
            return setJob(res.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    const candidates = job?.number_of_applicants;

    const d1 = moment(job?.data.lastDate);
    const d2 = moment(Date.now());
    const isLastDatePassed = d1.diff(d2, "days") < 0 ? true : false;

    useEffect(() => {
        fetchSingleJob()

        const coordinates = job
            ? job?.data?.point.split("(")[1].replace(")", "").split(" ")
            : [51.505, -0.09];

        // console.log(coordinates);

        if (error) {
            toast.error(error)
        }

        checkJobAppliedTo(job?.data.id)
    }, [id, error])

    const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });

    const applyToJobHandler = () => {
        applyToJob(job?.data?.id)

        toast.success(message)
    }
    
    return (
        <>
            {job ? (
                <div className="job-details-wrapper">
                    <div className="container container-fluid">
                        <div className="row">
                            <div className="col-xl-9 col-lg-8">
                                <div className="job-details p-3">
                                    <div className="job-header p-4">
                                        <h2>{job.data.title}</h2>
                                        <span>
                                            <i
                                                aria-hidden
                                                className="fas fa-building"
                                            ></i>
                                            <span> {job.data.company}</span>
                                        </span>
                                        <span className="ms-4">
                                            <i
                                                aria-hidden
                                                className="fas fa-map-marker-alt"
                                            ></i>
                                            <span> {job.data.address}</span>
                                        </span>

                                        <div className="mt-3">
                                            <span>
                                                {isLoading ? (
                                                    "Loading..."
                                                ) : applied ? (
                                                    <button
                                                        disabled
                                                        className="btn btn-success px-4 py-2 apply-btn"
                                                    >
                                                        <i
                                                            aria-hidden
                                                            className="fas fa-check"
                                                        ></i>{" "}
                                                        {isLoading
                                                            ? "Loading"
                                                            : "Applied"}
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-primary px-4 py-2 apply-btn"
                                                        onClick={
                                                            applyToJobHandler
                                                        }
                                                        disabled={
                                                            isLastDatePassed
                                                        }
                                                    >
                                                        {isLoading
                                                            ? "Applying..."
                                                            : "Apply Now"}
                                                    </button>
                                                )}
                                                <span className="ms-4 text-success">
                                                    <b>{candidates}</b>{" "}
                                                    candidates has applied to
                                                    this job.
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="job-description mt-5">
                                        <h4>Description</h4>
                                        <p>{job.data.description}</p>
                                    </div>

                                    <div className="job-summary">
                                        <h4 className="mt-5 mb-4">
                                            Job Summary
                                        </h4>
                                        <table className="table table-striped">
                                            <tbody>
                                                <tr>
                                                    <td>Job Type</td>
                                                    <td>:</td>
                                                    <td>{job.data.jobType}</td>
                                                </tr>

                                                <tr>
                                                    <td>Job Industry</td>
                                                    <td>:</td>
                                                    <td>{job.data.industry}</td>
                                                </tr>

                                                <tr>
                                                    <td>Expected Salary</td>
                                                    <td>:</td>
                                                    <td>
                                                        $
                                                        {addCommas(
                                                            job.data.salary
                                                        )}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Education</td>
                                                    <td>:</td>
                                                    <td>
                                                        {job.data.education}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Experience</td>
                                                    <td>:</td>
                                                    <td>
                                                        {job.data.experience}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Company</td>
                                                    <td>:</td>
                                                    <td>{job.data.company}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="job-location">
                                        <h4 className="mt-5 mb-4">
                                            Job Location
                                        </h4>
                                        <div>
                                            <Map/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-4">
                                <div className="job-contact-details p-3">
                                    <h4 className="my-4">More Details</h4>
                                    <hr />
                                    <h5>Email Address:</h5>
                                    <p>{job.data.email}</p>

                                    <h5>Job Posted:</h5>
                                    <p>
                                        {moment
                                            .utc(job.data.createdAt)
                                            .local()
                                            .startOf("seconds")
                                            .fromNow()}
                                    </p>

                                    <h5>Last Date:</h5>
                                    <p>{job.data.lastDate.substring(0, 10)}</p>
                                </div>

                                {isLastDatePassed && (
                                    <div className="mt-5 p-0">
                                        <div className="alert alert-danger">
                                            <h5>Note:</h5>
                                            You can no longer apply to this job.
                                            This job is expired. Last date to
                                            apply for this job was:{" "}
                                            <b>
                                                {job.data.lastDate.substring(
                                                    0,
                                                    10
                                                )}
                                            </b>
                                            <br /> Checkout others job on
                                            Jobbee.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Job NOT found!</h1>
            )}
        </>
    );
};
export default Job;
