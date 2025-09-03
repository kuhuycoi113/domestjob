
'use client';

import { useState } from 'react';
import { ConversationList } from '@/components/chat/conversation-list';
import { ChatWindow } from '@/components/chat/chat-window';
import { conversations, type Conversation } from '@/lib/chat-data';

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0] || null);

  return (
    <div className="flex h-screen bg-secondary">
      <aside className="w-1/3 border-r border-border bg-background">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
      </aside>
      <main className="w-2/3">
        {selectedConversation ? (
          <ChatWindow conversation={selectedConversation} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Chọn một cuộc trò chuyện để bắt đầu</p>
          </div>
        )}
      </main>
    </div>
  );
}
