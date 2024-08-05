"use client"


import Image from "next/image";
import Link from "next/link";
import Pagination from "react-js-pagination";

import Filters from "@/components/Filters";

import styles from "./page.module.css";

export default function Home() {
  const keyword = "";
  const jobs = [];
  const resPerPage = 3
  const count = 7
  const page = 6

  const handlePageClick = () => { }
  
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
                          <button className="btn btn-secondary float-right stats_btn">
                              Get Topic stats
                          </button>
                      </Link>
                      <div className="d-block">
                          <Link href="/search">Go to Search</Link>
                      </div>
                  </div>
                  {jobs &&
                      jobs.map((job) => <JobItem key={job.id} job={job} />)}

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
