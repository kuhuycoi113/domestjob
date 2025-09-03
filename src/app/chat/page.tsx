'use client';

import { useState } from 'react';
import { ConversationList } from '@/components/chat/conversation-list';
import { ChatWindow } from '@/components/chat/chat-window';
import { conversations, type Conversation } from '@/lib/chat-data';
import { Card } from '@/components/ui/card';

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0] || null);

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
