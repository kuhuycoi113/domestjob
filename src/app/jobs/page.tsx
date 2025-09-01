
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Bookmark, Star, Eye, List, LayoutGrid, PlusCircle, Edit } from 'lucide-react';
import { JobCard } from '@/components/job-card';
import { jobData } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { JobListRow } from '@/components/job-list-row';

const stats = [
    { title: 'Việc đã ứng tuyển', value: 5, icon: Briefcase },
    { title: 'Việc đã lưu', value: 12, icon: Bookmark },
    { title: 'Lượt xem hồ sơ của bạn', value: 28, icon: Eye }
];

const aspirations = [
    { id: 1, title: 'Kỹ sư cơ khí, Osaka', salary: '220,000 JPY', type: 'Kỹ sư' },
    { id: 2, title: 'Chế biến thực phẩm, Tokyo', salary: '180,000 JPY', type: 'Tokutei' },
];

// Mock data for different tabs
const appliedJobs = jobData.slice(0, 3).map(job => ({ ...job, applicationStatus: 'NTD đã xem', appliedDate: '2024-07-20' }));
const savedJobs = jobData.slice(2, 5);
const suggestedJobs = jobData.slice(0, 4);

export default function JobsDashboardPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    
  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <div className="text-center md:text-left mb-8">
            <h1 className="text-3xl font-bold font-headline">Trang quản lý việc làm</h1>
            <p className="text-muted-foreground mt-1">Quản lý toàn bộ hành trình tìm việc của bạn tại một nơi duy nhất.</p>
        </div>

        {/* Aspirations Section */}
        <div className="mb-8">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold font-headline">Nguyện vọng tìm việc của bạn</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {aspirations.map(asp => (
                    <Card key={asp.id} className="shadow-lg">
                        <CardContent className="p-4 flex flex-col justify-between h-full">
                            <div>
                                <Badge className="mb-2">{asp.type}</Badge>
                                <p className="font-bold">{asp.title}</p>
                                <p className="text-sm text-green-600 font-semibold">{asp.salary}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="mt-2 w-fit p-0 h-auto text-muted-foreground hover:text-primary">
                                <Edit className="h-3 w-3 mr-1"/> Sửa
                            </Button>
                        </CardContent>
                    </Card>
                ))}
                 <Card className="shadow-lg border-dashed flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer">
                    <CardContent className="p-4 text-center">
                       <PlusCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2"/>
                       <p className="font-semibold">Thêm nguyện vọng mới</p>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map(stat => (
                <Card key={stat.title} className="shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Main Content with Tabs */}
         <Tabs defaultValue="suggested" className="w-full">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
              <TabsList className="grid w-full grid-cols-3 md:w-fit">
                <TabsTrigger value="suggested"><Star className="mr-2 h-4 w-4"/> Gợi ý cho bạn</TabsTrigger>
                <TabsTrigger value="applied"><Briefcase className="mr-2 h-4 w-4"/> Đã ứng tuyển</TabsTrigger>
                <TabsTrigger value="saved"><Bookmark className="mr-2 h-4 w-4"/> Đã lưu</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                  <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')}>
                      <LayoutGrid className="h-5 w-5"/>
                  </Button>
                  <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')}>
                      <List className="h-5 w-5"/>
                  </Button>
              </div>
          </div>
          
          <TabsContent value="suggested" className="mt-6">
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {suggestedJobs.map((job) => ( <JobCard key={job.id} job={job} /> ))}
                </div>
            ) : (
                 <Card className="shadow-xl"><CardContent className="p-0">
                    <div className="space-y-px">
                        {suggestedJobs.map((job) => ( <JobListRow key={job.id} job={job} />))}
                    </div>
                </CardContent></Card>
            )}
          </TabsContent>

          <TabsContent value="applied" className="mt-6">
             {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appliedJobs.map((job) => ( <JobCard key={job.id} job={job} /> ))}
                </div>
            ) : (
                <Card className="shadow-xl"><CardContent className="p-0">
                     <div className="space-y-px">
                        {appliedJobs.map((job) => ( <JobListRow key={job.id} job={job} />))}
                    </div>
                </CardContent></Card>
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedJobs.map((job) => ( <JobCard key={job.id} job={job} /> ))}
                </div>
            ) : (
                 <Card className="shadow-xl"><CardContent className="p-0">
                     <div className="space-y-px">
                        {savedJobs.map((job) => ( <JobListRow key={job.id} job={job} />))}
                    </div>
                 </CardContent></Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
