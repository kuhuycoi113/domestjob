
'use client';

import { useState } from 'react';
import { ConversationList } from '@/components/chat/conversation-list';
import { ChatWindow } from '@/components/chat/chat-window';
import { conversations, type Conversation } from '@/lib/chat-data';
import { Card } from '@/components/ui/card';

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0] || null);

  return (
    <div className="bg-secondary p-4 md:p-8 flex items-center justify-center min-h-screen">
      <Card className="h-[90vh] w-full max-w-4xl shadow-2xl grid grid-cols-1 md:grid-cols-3 overflow-hidden">
        <div className="hidden md:block border-r border-border">
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
          />
        </div>
        <div className="md:col-span-2">
          {selectedConversation ? (
            <ChatWindow conversation={selectedConversation} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Chọn một cuộc trò chuyện để bắt đầu</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
