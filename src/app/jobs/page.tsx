
'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, ListFilter, Plus, Search } from 'lucide-react';
import { JobCard } from '@/components/job-card';
import { Input } from '@/components/ui/input';
import { Pager } from '@/lib/pager';
import { useSearchParams } from "next/navigation";
import { Pagination } from '@/components/pagination';
import { pagingJobs } from '../tim-kiem/actions';

const jobTypes = ['Thực tập sinh', 'Kỹ năng đặc định', 'Kỹ sư, Trí thức', 'Bán thời gian'];

const internIndustries = ['Ngư nghiệp', 'Nông Nghiệp', 'Thực phẩm', 'Sản xuất, dịch vụ tổng hợp', 'Cơ khí, kim loại', 'Xây dựng', 'May mặc'];

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState('Thị trường');
  const [activeJobType, setActiveJobType] = useState('Thực tập sinh');
  const [activeIndustry, setActiveIndustry] = useState('Thực phẩm');
  const searchParams = useSearchParams();

  const [results, setResults] = useState<any[]>([]);
  const [pager, setPager] = useState<Pager | null>(null);
  const q = searchParams.get("q") || "";
  const type = searchParams.get("type") || "";
  const location = searchParams.get("location") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 20;
  useEffect(() => {
    fetchJobs();
  }, [q, type, location, page]);

  const fetchJobs = async () => {
    const { hits, total } = await pagingJobs({ q, type, location, page, pageSize });
    setResults(hits);
    setPager(new Pager(total, page, pageSize));
  };

  const buildPageLink = (p: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", p.toString());
    return `/jobs?${params.toString()}`;
  };

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto px-2 md:px-4 py-4">
        {/* Job Type Navigation */}
        <div className="bg-background md:rounded-lg shadow-sm mb-1">
          <div className="p-2 whitespace-nowrap overflow-x-auto">
            {jobTypes.map((type) => (
              <Button
                key={type}
                variant={activeJobType === type ? 'default' : 'ghost'}
                className={`mr-2 rounded-full ${activeJobType === type ? 'bg-primary text-white' : ''}`}
                onClick={() => setActiveJobType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Intern Industries Sub-navigation */}
        {activeJobType === 'Thực tập sinh' && (
          <div className="bg-background md:rounded-lg shadow-sm mb-4">
            <div className="p-2 whitespace-nowrap overflow-x-auto">
              {internIndustries.map((industry) => (
                <Button
                  key={industry}
                  variant={activeIndustry === industry ? 'secondary' : 'ghost'}
                  size="sm"
                  className={`mr-2 rounded-full text-sm font-semibold ${activeIndustry === industry ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                  onClick={() => setActiveIndustry(industry)}
                >
                  {industry}
                </Button>
              ))}`
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-background rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 text-center font-semibold transition-colors ${activeTab === 'Thị trường' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('Thị trường')}
            >
              Thị trường
            </button>
            <button
              className={`flex-1 py-3 text-center font-semibold transition-colors ${activeTab === 'Của bạn' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('Của bạn')}
            >
              Của bạn
            </button>
          </div>

          {/* Filters and Header */}
          <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="relative w-full md:w-auto md:flex-grow max-w-xs">
              <Input placeholder="Tìm kiếm công việc..." className="pl-10 rounded-full" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="font-semibold text-muted-foreground whitespace-nowrap">3318 việc làm</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    Tuyển tại <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Nhật Bản</DropdownMenuItem>
                  <DropdownMenuItem>Việt Nam</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    Sắp xếp <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Mới nhất</DropdownMenuItem>
                  <DropdownMenuItem>Lương cao nhất</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="text-primary border-primary rounded-full px-3 py-1 h-auto">
                <ListFilter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="md:col-span-3 lg:col-span-3">
            <div className="grid grid-cols-1 gap-4">
              {results.map((hit) => {
                const job = { id: hit._id, ...hit._source };
                return <JobCard key={hit._id} job={job} />;
              })}
            </div>
            {/* {pager && <Pagination pager={pager} buildLink={buildPageLink} />} */}
          </div>
        </div>
      </div>
    </div>
  );
}
