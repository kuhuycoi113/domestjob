
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Bookmark, Star, Eye } from 'lucide-react';
import { JobCard } from '@/components/job-card';
import { jobData } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const stats = [
    { title: 'Việc đã ứng tuyển', value: 5, icon: Briefcase },
    { title: 'Việc đã lưu', value: 12, icon: Bookmark },
    { title: 'Lượt xem hồ sơ', value: 28, icon: Eye }
];

// Mock data for different tabs
const appliedJobs = jobData.slice(0, 3).map(job => ({ ...job, applicationStatus: 'NTD đã xem' }));
const savedJobs = jobData.slice(2, 5);
const suggestedJobs = jobData.slice(0, 4);

export default function JobsDashboardPage() {
  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto px-2 md:px-4 py-8">
        <div className="text-center md:text-left mb-8">
            <h1 className="text-3xl font-bold font-headline">Trang quản lý việc làm</h1>
            <p className="text-muted-foreground mt-1">Quản lý toàn bộ hành trình tìm việc của bạn tại một nơi duy nhất.</p>
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
          <TabsList className="grid w-full grid-cols-3 md:w-fit md:mx-auto">
            <TabsTrigger value="suggested"><Star className="mr-2 h-4 w-4"/> Gợi ý cho bạn</TabsTrigger>
            <TabsTrigger value="applied"><Briefcase className="mr-2 h-4 w-4"/> Đã ứng tuyển</TabsTrigger>
            <TabsTrigger value="saved"><Bookmark className="mr-2 h-4 w-4"/> Đã lưu</TabsTrigger>
          </TabsList>
          
          <TabsContent value="suggested" className="mt-6">
             <Card className="shadow-xl">
                 <CardHeader>
                     <CardTitle>Việc làm phù hợp nhất</CardTitle>
                 </CardHeader>
                 <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suggestedJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="applied" className="mt-6">
             <Card className="shadow-xl">
                <CardHeader>
                     <CardTitle>Việc làm đã ứng tuyển</CardTitle>
                 </CardHeader>
                <CardContent className="space-y-4">
                    {appliedJobs.map((job) => (
                         <Card key={job.id} className="flex flex-col md:flex-row items-center p-4 gap-4">
                            <div className="flex-grow">
                                <Link href={`/jobs/${job.id}`}>
                                    <p className="font-bold hover:text-primary">{job.title}</p>
                                </Link>
                                <p className="text-sm text-muted-foreground">{job.recruiter.company}</p>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800">{job.applicationStatus}</Badge>
                         </Card>
                    ))}
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
             <Card className="shadow-xl">
                <CardHeader>
                     <CardTitle>Việc làm đã lưu</CardTitle>
                </CardHeader>
                 <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

