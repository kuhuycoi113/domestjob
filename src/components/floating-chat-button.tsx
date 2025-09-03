'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { ChatWindow } from './chat/chat-window';
import { conversations } from '@/lib/chat-data';

export function FloatingChatButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Hide the button on pages where it's not needed.
  if (pathname.startsWith('/partner/')) {
    return null;
  }
  
  const selectedConversation = conversations[0] || null;

  return (
    <>
        {/* Desktop floating window */}
        <div className="hidden md:block fixed bottom-6 right-6 z-50">
            {isOpen && selectedConversation && (
                 <Card className="h-[60vh] w-[350px] shadow-2xl flex flex-col overflow-hidden rounded-2xl">
                    <ChatWindow conversation={selectedConversation} />
                 </Card>
            )}
            <div className="flex justify-end mt-2">
                 <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="h-16 w-16 rounded-full bg-primary shadow-lg hover:bg-primary/90">
                    {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
                    <span className="sr-only">{isOpen ? "Đóng Chat" : "Mở Chat"}</span>
                </Button>
            </div>
        </div>

        {/* Mobile floating button */}
        <div className="md:hidden fixed bottom-24 right-4 z-40">
             <Button asChild size="icon" className="h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90">
                <Link href="/chat">
                <MessageSquare className="h-7 w-7" />
                <span className="sr-only">Mở Chat</span>
                </Link>
            </Button>
        </div>
    </>
  );
}
