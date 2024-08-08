"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "react-js-pagination";
import axios from "axios";

import Filters from "@/components/Filters";
import JobItem from "@/components/job/JobItem";


import styles from "./page.module.css";

export default function Home() {
    const [jobs, setJobs] = useState([]);

    async function getAllJobs() {
        try {
            const res = await axios.get(`${process.env.API_URL}/api/v1/jobs/`);

            console.log(res.data);

            return setJobs(res.data);
        } catch (error) {
            console.error(error);
        }
        
    }
    const keyword = "";
    
    const resPerPage = jobs?.data?.resPerPage;
    const count = jobs?.data?.count;
    const page = jobs?.data?.page;

    const handlePageClick = () => { };
    
    useEffect(() => {
        getAllJobs()
    },[])

    return (
        <div className="container container-fluid">
            <div className="row">
                <div className="col-xl-3 col-lg-4">
                    <Filters />
                </div>

                <div className="col-xl-9 col-lg-8 content-left-offset">
                    <div className="my-5">
                        <h4 className="page-title">
                            {keyword
                                ? `${jobs.length} Results for ${keyword}`
                                : "Latest Jobs"}
                        </h4>
                        <Link href="/stats">
                            <button className="btn btn-secondary float-end stats_btn">
                                Get Topic stats
                            </button>
                        </Link>
                        <div className="d-block">
                            <Link href="/search">Go to Search</Link>
                        </div>
                    </div>
                    {jobs &&
                        jobs?.data?.map((job) => <JobItem key={job.id} job={job} />)}

                    {resPerPage < count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={count}
                                onChange={handlePageClick}
                                nextPageText={"Next"}
                                prevPageText={"Prev"}
                                firstPageText={"First"}
                                lastPageText={"Last"}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
