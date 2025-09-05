
'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Message, User } from '@/lib/chat-data';
import { jobData } from '@/lib/mock-data';
import { JobCard } from '../job-card';
import { Loader2 } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  currentUser: User;
}

export function ChatMessage({ message, currentUser }: ChatMessageProps) {
  const isCurrentUser = message.sender.id === currentUser.id;
  const recommendedJobs = message.recommendations
    ? message.recommendations
        .map(rec => jobData.find(job => job.id === rec.id))
        .filter((job): job is NonNullable<typeof job> => job !== undefined)
    : [];

  if (message.isLoading) {
    return (
        <div className="flex items-start gap-2 justify-start">
            <Avatar className="h-8 w-8">
                <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} />
                <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                 <p className="text-xs text-muted-foreground mb-1 ml-3">
                    {message.sender.name}
                </p>
                <div className="bg-background rounded-2xl rounded-bl-none px-4 py-2 border flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                    <span className="text-sm text-muted-foreground italic">AI đang tìm kiếm...</span>
                </div>
            </div>
        </div>
    )
  }

  return (
    <div className={cn('flex items-start gap-2', isCurrentUser ? 'justify-end' : 'justify-start')}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} />
          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col gap-2" style={{ maxWidth: 'calc(100% - 40px)' }}>
        {!isCurrentUser && (
            <p className="text-xs text-muted-foreground ml-3">
                {message.sender.name}
            </p>
        )}
        <div
            className={cn(
            'max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2 w-fit',
            isCurrentUser
                ? 'bg-primary text-primary-foreground rounded-br-none self-end'
                : 'bg-background rounded-bl-none border'
            )}
        >
            <p className="text-sm">{message.text}</p>
        </div>
        {recommendedJobs.length > 0 && (
            <div className="w-full md:w-[450px] lg:w-[500px] flex-shrink-0">
                <div className="space-y-2">
                {recommendedJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
