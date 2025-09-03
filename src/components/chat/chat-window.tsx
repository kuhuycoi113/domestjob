
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Phone, Video, X, Paperclip, Image as ImageIcon, Briefcase } from 'lucide-react';
import { ChatMessage } from './chat-message';
import { type Conversation, type Message, currentUser, users } from '@/lib/chat-data';

interface ChatWindowProps {
  conversation: Conversation;
}

export function ChatWindow({ conversation }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const [newMessage, setNewMessage] = useState('');
  const otherUser = conversation.participants.find(p => p.id !== currentUser.id) || users[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-secondary">
      {/* Header */}
      <header className="flex items-center gap-4 p-3 border-b bg-primary text-primary-foreground shadow-md">
        <Briefcase className="h-8 w-8" />
        <div>
          <p className="text-xl font-bold font-headline">HelloJob</p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <p className="text-xs text-primary-foreground/80">Đang hoạt động</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20"><Phone /></Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20"><Video /></Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20"><X /></Button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} currentUser={currentUser} />
        ))}
      </div>

      {/* Input */}
      <footer className="p-4 border-t bg-background">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
           <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" className="text-muted-foreground"><Paperclip /></Button>
             <Button variant="ghost" size="icon" className="text-muted-foreground"><ImageIcon /></Button>
           </div>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập câu hỏi của bạn ở đây..."
            className="flex-grow rounded-full pl-4 pr-12 h-12 bg-secondary"
          />
          <Button type="submit" size="icon" className="absolute right-2 h-9 w-9 bg-primary rounded-full">
            <Send className="h-5 w-5"/>
          </Button>
        </form>
      </footer>
    </div>
  );
}
