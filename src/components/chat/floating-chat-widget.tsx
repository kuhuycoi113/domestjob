
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
      // When user clicks the general chat button, openChat without a specific user.
      // The context will decide whether to show the bot or an assigned consultant.
      openChat(); 
    }
  };
  
  return (
    <>
      {/* Mobile full-screen overlay */}
      {isChatOpen && activeConversation && (
        <div className="md:hidden fixed inset-0 z-50 bg-background">
          <ChatWindow conversation={activeConversation} />
        </div>
      )}

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
    </>
  );
}
