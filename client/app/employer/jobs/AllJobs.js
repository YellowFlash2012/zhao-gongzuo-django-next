"use client"

import { useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import DataTable from "react-data-table-component";


import { useGlobalJobContext } from "@/context/JobContext";
import Loader from "@/components/Loader";

const AllJobs = () => {
    const {
        jobs,
        error,
        isLoading,
        getAllJobsOfAnEmployer,
        deleteJobHandler,
        updateJobByEmployer,
    } = useGlobalJobContext();
    
    const columns = [
        {
            name: "Job ID",
            sortable: true,
            selector: (row) => row.id,
        },
        {
            name: "Job name",
            sortable: true,
            selector: (row) => row.title,
        },
        {
            name: "Salary",
            sortable: true,
            selector: (row) => row.salary,
        },
        {
            name: "Action",
            sortable: true,
            selector: (row) => row.action,
        },
    ];

    const data = [];

    jobs &&
        jobs.forEach((job) => {
            data.push({
                id: job.id,
                title: job.title,
                salary: job.salary,
                action: (
                    <>
                        <Link href={`/jobs/${job.id}`}>
                            <a className="btn btn-primary">
                                <i aria-hidden className="fa fa-eye"></i>
                            </a>
                        </Link>
                        <Link href={`/employer/jobs/candidates/${job.id}`}>
                            <a className="btn btn-success my-2 mx-1">
                                <i aria-hidden className="fa fa-users"></i>
                            </a>
                        </Link>
                        <Link href={`/employer/jobs/${job.id}`}>
                            <a className="btn btn-warning my-2 mx-1">
                                <i aria-hidden className="fa fa-pencil"></i>
                            </a>
                        </Link>
                        <button
                            className="btn btn-danger mx-1"
                            onClick={() => deleteJobHandler(job.id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });

    useEffect(() => {
        if (error) {
            toast.error(error)
        }

        getAllJobsOfAnEmployer()
    }, [error])
    
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8 mt-5">
                        <h4 className="my-5">My Jobs</h4>
                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                            responsive
                        />
                    </div>
                    <div className="col-2"></div>
                </div>
            )}
        </>
    );
};
export default AllJobs;
