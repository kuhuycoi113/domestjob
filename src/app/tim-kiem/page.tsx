"use server";

import { notFound } from "next/navigation";
import { convertQueryParamsToJobFilter, getJobImage } from "@/lib/utils";
import { Pager } from "@/app/class/pager.class";
import { pagingJobs } from "./actions";

// 👉 Các component UI
import { SearchBar } from "@/components/search-bar";
import FilterSidebar from "@/app/tim-kiem/FilterSidebar";
import { JobCard } from "@/components/job-card";
// import Pagination from "@/components/pagination";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

type SearchParamsObj = Record<string, string | string[] | undefined>;

type PageProps = {
  // ✅ Next.js 15: searchParams là Promise
  searchParams: Promise<SearchParamsObj>;
  filter?: any;
};

// Helper: ép search params về dạng Record<string, string>
function normalizeSearchParams(sp: SearchParamsObj): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === "undefined") continue;
    out[k] = Array.isArray(v) ? v[0] ?? "" : v;
  }
  return out;
}

// Build link phân trang (giữ nguyên filter đang dùng)
const buildPageLink = (page: number, filter: Record<string, any>) => {
  const params = new URLSearchParams();
  Object.entries(filter ?? {}).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    params.set(k, String(v));
  });
  params.set("page", String(page));
  return `/tim-kiem?${params.toString()}`;
};

export default async function JobCategoryPage({ searchParams, filter }: PageProps) {
  // 🔴 BẮT BUỘC: await trong Next 15
  const rawParams = await searchParams;
  console.log("🔍 rawParams:", rawParams);

  const params = normalizeSearchParams(rawParams);
  console.log("✅ normalize params:", params);

  // Trang hiện tại
  const page = Number(params.page ?? 1);

  // Filter sau khi merge
  filter = filter ?? {};
  filter = { ...filter, ...convertQueryParamsToJobFilter(params) };
  if (filter.languageLevel && typeof filter.languageLevel === "string") {
    filter.languageLevel = filter.languageLevel.split(";").map((lvl:any) => lvl.trim());
  }
  console.log("✅ filter sau khi merge:", filter);

  // Pager
  const pager = new Pager();
  pager.filter = filter;
  pager.currentPage = page;

  // Kết quả job
  let results: any[] = [];
  try {
    const apiData = await pagingJobs(pager);
    pager.totalResult = apiData?.hits?.total?.value ?? 0;
    results = apiData?.hits?.hits ?? [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return notFound();
  }

  // UI
  return (
    <div className="w-full bg-secondary min-h-screen">
      {/* Thanh search */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white pt-6 pb-2">
        <div className="container mx-auto px-4 md:px-6">
          <SearchBar />
        </div>
      </div>

      {/* Nội dung */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{pager.totalResult ? `Tìm thấy ${pager.totalResult} kết quả` : "Đang tìm kiếm..."}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 md:hidden">
              <ListFilter className="w-4 h-4" />
              Lọc
            </Button>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="relevance">Liên quan nhất</SelectItem>
                <SelectItem value="salary_desc">Lương cao đến thấp</SelectItem>
                <SelectItem value="salary_asc">Lương thấp đến cao</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Layout 2 cột */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {/* Sidebar filter */}
          <div className="hidden md:block">
            <FilterSidebar />
          </div>

          {/* Danh sách job */}
          <div className="md:col-span-3 lg:col-span-3">
            <div className="grid grid-cols-1 gap-4">
              {results.map((hit: any) => {
                const job = {
                  id: hit._id,
                  ...hit._source,
                  avatar : getJobImage(hit._source.job , hit._source.career),
                  expired: hit.fields?.expired?.[0] ?? false,
                };
                return <JobCard key={hit._id} job={job} />;
              })}
            </div>

            {/* Pagination */}
            {/* {pager && <Pagination pager={pager} buildLink={(p) => buildPageLink(p, filter)} />} */}
          </div>
        </div>
      </div>
    </div>
  );
}
