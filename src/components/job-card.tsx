
"use client"
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, Phone, Briefcase, User, MoreHorizontal, MapPin, ArrowLeft } from 'lucide-react';
import { ZaloIcon } from './custom-icons';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, generateBulletJobCrawl } from '@/lib/utils';
import Link from 'next/link';

export const JobCard = ({ job }: { job: any }) => {
  const bullet = generateBulletJobCrawl(job)
  
  
  // Desktop layout
  const DesktopLayout = () => (
    <div className="hidden md:flex flex-row items-stretch w-full p-4 gap-4">
      {/* Left side: Image */}
      <div className="relative w-1/4 flex-shrink-0 aspect-video rounded-lg overflow-hidden">
        <Link href={`/jobs/${job.id}`}>
          <Image src={job?.avatar} alt={bullet} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
        </Link>
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1.5">
          <div className={cn("w-2 h-2 rounded-full", job?.createdID ? "bg-red-500 animate-pulse" : "bg-gray-400")}></div>
          <span>{job.id}</span>
        </div>
      </div>

      {/* Middle side: Main Content */}
      <div className="flex-grow flex flex-col justify-between py-1">
        <div>
          <Link href={`/jobs/${job.id}`} className="group">
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary cursor-pointer leading-tight line-clamp-3 h-15">{bullet}</h3>
          </Link>
          <div className="flex items-center gap-2 mb-3">
            {!!job?.realSalary && (
              <Badge variant="secondary" className="text-sm bg-green-100 text-green-800 border-green-200 py-1 px-3">
                Thực lĩnh: {job?.realSalary}
              </Badge>
            )}
            <Badge variant="secondary" className="text-sm py-1 px-3">
              Cơ bản: {job.basicSalary}
            </Badge>
          </div>
          <p className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" />
            <span>Nagasaki</span>
          </p>
        </div>

        <div className="mt-auto flex items-center gap-4 text-sm">
          <Avatar className="w-10 h-10">
            {/* <AvatarImage src={job.recruiter.avatar} alt={job.recruiter.name} /> */}
            {/* <AvatarFallback>{job.recruiter.name.charAt(0)}</AvatarFallback> */}
          </Avatar>
          {/* <div>
            <p className="font-semibold text-primary">{job.recruiter.name}</p>
            <p className="text-muted-foreground">{job.recruiter.company}</p>
          </div> */}
          <Button variant="outline" size="sm" className="h-9">
            <Phone className="text-green-500 h-5 w-5" />
          </Button>
          <ZaloIcon className="h-8 w-8 cursor-pointer" />
        </div>
      </div>

      {/* Right side: Actions and Meta */}
      <div className="w-1/4 flex flex-col items-end justify-between text-right py-1">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>8k2</span>
          <Heart className="w-5 h-5 text-red-500/80 hover:fill-current cursor-pointer" />
        </div>
        <div className="space-y-2">{/* {job.tags.slice(0, 2).map((tag: string) => <Badge key={tag} className="ml-1">{tag}</Badge>)} */}</div>
        <Button asChild className="w-full bg-primary text-white mt-4">
          <Link href={`/jobs/${job.id}`}>
            Xem chi tiết <Briefcase />
          </Link>
        </Button>
      </div>
    </div>
  );

  // Mobile layout
  const MobileLayout = () => (
     <div className="md:hidden flex flex-row items-stretch w-full">
      <div className="relative w-1/3 flex-shrink-0 aspect-[4/3]">
        <Link href={`/jobs/${job.id}`}>
            <Image src={job?.avatar} alt={bullet} fill className="object-cover" />
        </Link>
         <div className="absolute top-1 left-1 bg-black/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
          <div className={cn("w-1.5 h-1.5 rounded-full", job?.createdID ? 'bg-red-500 animate-pulse' : 'bg-gray-400')}></div>
          <span>{job.id}</span>
        </div>
        <div className="absolute bottom-1 right-1 flex items-center gap-2">
            <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <span>8k2</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
            </div>
        </div>
      </div>

      <div className="w-2/3 p-3 flex-grow flex flex-col justify-between">
        <div>
            <Link href={`/jobs/${job.id}`} className="group">
                 <h3 className="font-bold text-sm mb-2 group-hover:text-primary cursor-pointer leading-tight line-clamp-3 h-16">{bullet}</h3>
            </Link>
            <div className="flex flex-wrap gap-1 mb-2">
                {job.realSalary && <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">Thực lĩnh: {job.realSalary}</Badge>}
                <Badge variant="secondary" className="text-xs">Cơ bản: {job.basicSalary}</Badge>
            </div>
             <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <MapPin className="h-3 w-3" />
                <span>Nagasaki</span>
            </p>
        </div>
        
        <div className="mt-auto space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <Avatar className="w-6 h-6">
                {/* <AvatarImage src={job.recruiter.avatar} alt={job.recruiter.name} />
                <AvatarFallback>{job.recruiter.name.charAt(0)}</AvatarFallback> */}
              </Avatar>
              <div className="flex-grow">
                {/* <p className="font-semibold text-blue-600 truncate">{job.recruiter.name}</p>
                <p className="text-muted-foreground truncate">{job.recruiter.company}</p> */}
              </div>
            </div>

            <div className="flex justify-between items-center border-t pt-2">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Phone className="text-green-500 h-5 w-5"/></Button>
                    <ZaloIcon className="h-5 w-5 cursor-pointer" />
                    <Button variant="ghost" size="icon" className="h-7 w-7"><User className="h-5 w-5"/></Button>
                </div>
                <div>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href={`/jobs/${job.id}`} className="w-full flex">
                                    <Briefcase className="mr-2 h-4 w-4" /> Xem chi tiết
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow duration-300">
        <MobileLayout />
        <DesktopLayout />
    </Card>
  );
};
