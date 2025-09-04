
'use client';

import { useState } from 'react';
import { ChatWindow } from '@/components/chat/chat-window';
import { conversations, helloJobBot } from '@/lib/chat-data';

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations.find(c => c.participants.some(p => p.id === helloJobBot.id)) || conversations[0]);

  // This page is now primarily for mobile view.
  // We will render the ChatWindow directly for a full-screen experience.
  return (
    <div className="h-screen bg-secondary">
        {selectedConversation ? (
            <ChatWindow conversation={selectedConversation} />
        ) : (
            <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Không có cuộc trò chuyện nào</p>
            </div>
        )}
    </div>
  );
}
