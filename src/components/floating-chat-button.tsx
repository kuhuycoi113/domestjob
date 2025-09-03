'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function FloatingChatButton() {
  const pathname = usePathname();

  // Hide the button on the chat page itself
  if (pathname === '/chat') {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6">
      <Button asChild size="icon" className="h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90">
        <Link href="/chat">
          <MessageSquare className="h-7 w-7" />
          <span className="sr-only">Mở Chat</span>
        </Link>
      </Button>
    </div>
  );
}
