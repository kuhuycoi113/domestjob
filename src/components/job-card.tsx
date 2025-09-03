
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, Phone, Briefcase, User, MoreHorizontal, MapPin } from 'lucide-react';
import { Job } from '@/lib/mock-data';
import { ZaloIcon } from './custom-icons';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const JobCard = ({ job }: { job: Job }) => {
  // Desktop layout
  const DesktopLayout = () => (
    <div className="hidden md:flex flex-row items-stretch w-full p-4 gap-4">
      {/* Left side: Image */}
      <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
        <Link href={`/jobs/${job.id}`}>
          <Image src={job.image.src} alt={job.title} fill className="object-cover" />
        </Link>
        <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
          <div className={cn("w-1.5 h-1.5 rounded-full", job.isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400')}></div>
          <span>{job.id}</span>
        </div>
      </div>

      {/* Middle side: Main Content */}
      <div className="flex-grow flex flex-col justify-between py-1">
        <div>
          <Link href={`/jobs/${job.id}`} className="group">
            <h3 className="font-bold text-base mb-1 group-hover:text-primary cursor-pointer leading-tight line-clamp-2">{job.title}</h3>
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-2">
              {job.salary.actual && <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-200">Thực lĩnh: {job.salary.actual}</Badge>}
              <Badge variant="secondary" className="text-xs">Cơ bản: {job.salary.basic}</Badge>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{job.workLocation}</span>
          </p>
        </div>
        
        <div className="mt-auto flex items-center gap-2 text-xs">
          <Avatar className="w-8 h-8">
            <AvatarImage src={job.recruiter.avatar} alt={job.recruiter.name} />
            <AvatarFallback>{job.recruiter.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-primary text-sm">{job.recruiter.name}</p>
            <p className="text-muted-foreground">{job.recruiter.company}</p>
          </div>
           <Button variant="outline" size="icon" className="h-8 w-8 ml-auto"><Phone className="text-green-500 h-4 w-4"/></Button>
           <ZaloIcon className="h-6 w-6 cursor-pointer" />
        </div>
      </div>
      
      {/* Right side: Actions and Meta */}
      <div className="w-1/5 flex flex-col items-end justify-between text-right py-1">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>{job.likes}</span>
              <Heart className="w-5 h-5 text-red-500/80 hover:fill-current cursor-pointer" />
          </div>
          <div className="space-y-1">
            {job.tags.slice(0, 2).map(tag => <Badge key={tag} variant="outline" className="ml-1 text-xs">{tag}</Badge>)}
          </div>
          <Link href={`/jobs/${job.id}`} className="w-full mt-2">
            <Button size="sm" className="w-full bg-primary text-white"><Briefcase className="mr-1.5"/> Chi tiết</Button>
          </Link>
      </div>
    </div>
  );

  // Mobile layout
  const MobileLayout = () => (
     <div className="md:hidden flex flex-row items-stretch w-full">
      <div className="relative w-1/3 flex-shrink-0 aspect-[4/3]">
        <Link href={`/jobs/${job.id}`}>
            <Image src={job.image.src} alt={job.title} fill className="object-cover" />
        </Link>
         <div className="absolute top-1 left-1 bg-black/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
          <div className={cn("w-1.5 h-1.5 rounded-full", job.isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400')}></div>
          <span>{job.id}</span>
        </div>
        <div className="absolute bottom-1 right-1 flex items-center gap-2">
            <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <span>{job.likes}</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
            </div>
        </div>
      </div>

      <div className="w-2/3 p-3 flex-grow flex flex-col justify-between">
        <div>
            <Link href={`/jobs/${job.id}`} className="group">
                 <h3 className="font-bold text-sm mb-2 group-hover:text-primary cursor-pointer leading-tight line-clamp-3">{job.title}</h3>
            </Link>
            <div className="flex flex-wrap gap-1 mb-2">
                {job.salary.actual && <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">Thực lĩnh: {job.salary.actual}</Badge>}
                <Badge variant="secondary" className="text-xs">Cơ bản: {job.salary.basic}</Badge>
            </div>
             <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <MapPin className="h-3 w-3" />
                <span>{job.workLocation}</span>
            </p>
        </div>
        
        <div className="mt-auto space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <Avatar className="w-6 h-6">
                <AvatarImage src={job.recruiter.avatar} alt={job.recruiter.name} />
                <AvatarFallback>{job.recruiter.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="font-semibold text-blue-600 truncate">{job.recruiter.name}</p>
                <p className="text-muted-foreground truncate">{job.recruiter.company}</p>
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
