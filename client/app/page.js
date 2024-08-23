"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Pagination from "react-js-pagination";
import axios from "axios";

import Filters from "@/components/Filters";
import JobItem from "@/components/job/JobItem";



export default function Home() {
    const [jobs, setJobs] = useState([]);

    const query = useSearchParams();

    const router = useRouter();

    // console.log(query);

    let keyword = query.get('keyword') || "";
    const location = query.get('location') || "";
    const jobType = query.get('jobType') || "";
    const education = query.get('education') || "";
    const experience = query.get('experience') || "";
    const salary = query.get('salary') || "";

    const page = query.get('page') || 1;

    // console.log(jobType);

    let min_salary = "";
    let max_salary = "";

    if (salary) {
        const [min, max] = salary.split('-');

        min_salary = min;

        max_salary = max;
    }

    async function getAllJobs() {

        const queryStr = `keyword=${keyword}&location=${location}&page=${page}&jobType=${jobType}&education=${education}&experience=${experience}&min_salary=${min_salary}&max_salary=${max_salary}`;

        try {
            const res = await axios.get(
                `${process.env.API_URL}/api/v1/jobs/?${queryStr}`
            );

            console.log(res.data);

            return setJobs(res.data);
        } catch (error) {
            console.error(error);
        }
    }
    

    const resPerPage = jobs?.resPerPage;
    const count = jobs?.count;
    // console.log(resPerPage, count);
    // let page = jobs?.data?.page;

    let queryParams;

    if (typeof window !== "undefined") {
        queryParams = new URLSearchParams(window.location.search);
    }

    const handlePageClick = (currentPage) => {
        if (queryParams.has('page')) {
            queryParams.set('page', currentPage)
        } else {
            queryParams.append('page', currentPage)
        }

        router.push(`/?${queryParams}`);
    };

    useEffect(() => {
        getAllJobs();
    }, [keyword, location, jobType, education,experience,salary, page]);


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
                                ? `${jobs?.data?.length} Results for ${keyword}`
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
                        jobs?.data?.map((job) => (
                            <JobItem key={job.id} job={job} />
                        ))}

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
