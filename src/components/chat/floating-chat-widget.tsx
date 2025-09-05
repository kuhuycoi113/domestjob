
'use client';

import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ChatWindow } from './chat-window';
import { conversations, helloJobBot, currentUser } from '@/lib/chat-data';

export function FloatingChatWidget() {
  const { isChatOpen, openChat, closeChat, activeConversation } = useChat();

  const handleToggleChat = () => {
    if (isChatOpen) {
      closeChat();
    } else {
      // openChat will now handle the logic of finding or assigning a consultant
      openChat(); 
    }
  };
  
  return (
    <>
        {/* Desktop floating window */}
        <div className="hidden md:block fixed bottom-6 right-6 z-50">
            {isChatOpen && activeConversation && (
                 <Card className="h-[70vh] max-h-[700px] w-[400px] shadow-2xl flex flex-col overflow-hidden rounded-2xl">
                    <ChatWindow conversation={activeConversation} />
                 </Card>
            )}
            <div className="flex justify-end mt-2">
                 <Button onClick={handleToggleChat} size="icon" className="h-16 w-16 rounded-full bg-primary shadow-lg hover:bg-primary/90">
                    {isChatOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
                    <span className="sr-only">{isChatOpen ? "Đóng Chat" : "Mở Chat"}</span>
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
