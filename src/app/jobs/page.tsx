
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Bookmark, Star, Eye, List, LayoutGrid, PlusCircle, Edit } from 'lucide-react';
import { JobCard } from '@/components/job-card';
import { jobData } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { JobListRow } from '@/components/job-list-row';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileViewersDialog } from '@/components/profile-viewers-dialog';


const aspirations = [
    { id: 1, title: 'Kỹ sư cơ khí, Osaka', salary: '220,000 JPY', type: 'Kỹ sư' },
    { id: 2, title: 'Chế biến thực phẩm, Tokyo', salary: '180,000 JPY', type: 'Tokutei' },
];

const appliedJobs = jobData.slice(0, 3).map(job => ({ ...job, applicationStatus: 'NTD đã xem', appliedDate: '2024-07-20' }));
const savedJobs = jobData.slice(2, 5);
const suggestedJobs = jobData.slice(0, 4);

const viewers = [
  { name: 'A', src: 'https://placehold.co/40x40.png?text=A' },
  { name: 'B', src: 'https://placehold.co/40x40.png?text=B' },
  { name: 'C', src: 'https://placehold.co/40x40.png?text=C' },
  { name: 'D', src: 'https://placehold.co/40x40.png?text=D' },
  { name: 'E', src: 'https://placehold.co/40x40.png?text=E' },
  { name: 'F', src: 'https://placehold.co/40x40.png?text=F' },
];

export default function JobsDashboardPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isViewersDialogOpen, setIsViewersDialogOpen] = useState(false);
    
  const JobListing = ({ jobs }: { jobs: (typeof jobData) }) => (
    <div className="pt-4">
        {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {jobs.map((job) => ( <JobCard key={job.id} job={job} /> ))}
            </div>
        ) : (
            <Card className="shadow-xl"><CardContent className="p-0">
                <div className="space-y-px">
                    {jobs.map((job) => ( <JobListRow key={job.id} job={job} />))}
                </div>
            </CardContent></Card>
        )}
    </div>
  );

  return (
    <>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <Card 
                className="shadow-lg md:col-span-1 cursor-pointer hover:bg-secondary/80 transition-colors"
                onClick={() => setIsViewersDialogOpen(true)}
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Lượt xem hồ sơ của bạn</CardTitle>
                    <Eye className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{viewers.length}</div>
                    <div className="flex items-center mt-2">
                        <div className="flex -space-x-2 overflow-hidden">
                            {viewers.slice(0, 5).map((viewer, index) => (
                                <Avatar key={index} className="inline-block h-6 w-6 border-2 border-background">
                                    <AvatarImage src={viewer.src} />
                                    <AvatarFallback>{viewer.name}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                        {viewers.length > 5 && (
                           <span className="text-xs font-semibold text-muted-foreground ml-3">+{viewers.length - 5}</span>
                        )}
                    </div>
                </CardContent>
            </Card>
             <div className="md:col-span-2">
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="bg-background px-6 rounded-t-lg font-semibold text-base hover:no-underline">
                            <div className="flex items-center gap-3">
                                <Star className="h-5 w-5 text-yellow-500" />
                                <span>Gợi ý cho bạn</span>
                                <Badge>{suggestedJobs.length}</Badge>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="bg-background p-6 rounded-b-lg">
                           <JobListing jobs={suggestedJobs} />
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-2">
                        <AccordionTrigger className="bg-background px-6 rounded-t-lg font-semibold text-base hover:no-underline mt-4">
                            <div className="flex items-center gap-3">
                                <Briefcase className="h-5 w-5 text-blue-500" />
                                <span>Việc đã ứng tuyển</span>
                                <Badge>{appliedJobs.length}</Badge>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="bg-background p-6 rounded-b-lg">
                           <JobListing jobs={appliedJobs} />
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3" className="border-b-0">
                        <AccordionTrigger className="bg-background px-6 rounded-t-lg font-semibold text-base hover:no-underline mt-4">
                            <div className="flex items-center gap-3">
                                <Bookmark className="h-5 w-5 text-red-500" />
                                <span>Việc đã lưu</span>
                                <Badge>{savedJobs.length}</Badge>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="bg-background p-6 rounded-b-lg">
                           <JobListing jobs={savedJobs} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>

      </div>
    </div>
    <ProfileViewersDialog isOpen={isViewersDialogOpen} onClose={() => setIsViewersDialogOpen(false)} />
    </>
  );
}
