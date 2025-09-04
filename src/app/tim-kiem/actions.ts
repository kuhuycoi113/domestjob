"use server";

import { search } from "@/lib/elasticsearch";
import { Pager } from "@/lib/pager";
import { convertFilterToQuery } from "@/lib/utils";


export const pagingJobs = async (pager: any, exchangeRates?: any): Promise<any> => {
  try {
    // Chuẩn hóa filter đầu vào (nếu cần)
    let filter = { ...pager?.filter };
    console.log("Filter before query:", filter);

    // Xử lý chuẩn hóa đầu vào cho jobs/workLocation nếu là chuỗi
    if (typeof filter.jobs === "string") {
      filter.jobs = filter.jobs
        .split(";")
        .map((item: any) => item.trim())
        .filter(Boolean);
    }
    if (typeof filter.workLocation === "string") {
      filter.workLocation = filter.workLocation
        .split(";")
        .map((item: any) => item.trim())
        .filter(Boolean);
    }
    if (typeof filter.basicSalary === "string") {
      filter.basicSalary = filter.basicSalary
        .split(";")
        .map((item: any) => item.trim())
        .filter(Boolean);
    }
    if (typeof filter.fee === "string") {
      filter.fee = filter.fee
        .split(";")
        .map((item: any) => item.trim())
        .filter(Boolean);
    }
    if (typeof filter.specialConditions === "string") {
      filter.specialConditions = filter.specialConditions
        .split(";")
        .map((item: any) => item.trim())
        .filter(Boolean);
    }
    const queryGet = convertFilterToQuery(filter, exchangeRates);
    queryGet.from = (pager.currentPage - 1) * pager.displayPerPage;
    queryGet.size = pager.displayPerPage;
    queryGet.sort = {
      postedDate: { order: "desc" },
    };
    const index = `${process.env.ELASTICSEARCH_PREFIX}-job-crawled`;
    const res = await search({
      index,
      body: queryGet,
    });
    return res ?? { hits: { total: { value: 0 }, hits: [] } };
  } catch (error) {
    throw error;
  }
};
