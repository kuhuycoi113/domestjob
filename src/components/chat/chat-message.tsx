
'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Message, User } from '@/lib/chat-data';

interface ChatMessageProps {
  message: Message;
  currentUser: User;
}

export function ChatMessage({ message, currentUser }: ChatMessageProps) {
  const isCurrentUser = message.sender.id === currentUser.id;

  return (
    <div className={cn('flex items-end gap-2', isCurrentUser ? 'justify-end' : 'justify-start')}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} />
          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2',
          isCurrentUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-background rounded-bl-none border'
        )}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
}
