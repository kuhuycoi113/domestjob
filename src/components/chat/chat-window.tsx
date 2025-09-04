
'use client';

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Phone, Video, X, Paperclip, Image as ImageIcon, Briefcase } from 'lucide-react';
import { ChatMessage } from './chat-message';
import { type Conversation, type Message, currentUser, users, helloJobBot } from '@/lib/chat-data';
import { useChat } from '@/contexts/ChatContext';
import Link from 'next/link';
import { Logo } from '@/components/header';

interface ChatWindowProps {
  conversation: Conversation;
}

export function ChatWindow({ conversation }: ChatWindowProps) {
  const { sendMessage, closeChat } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const mainContact = conversation.participants.find(p => p.id !== currentUser.id) || users[0];
  const isBotChat = mainContact.id === helloJobBot.id;


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-secondary">
      {/* Header */}
      <header className="flex items-center gap-3 p-3 border-b bg-primary text-primary-foreground shadow-md flex-shrink-0">
        {isBotChat ? (
             <div className="flex flex-col items-center">
                <div className="bg-white rounded-full p-1">
                  <Logo className="h-6 w-auto" />
                </div>
             </div>
        ) : (
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={mainContact.avatarUrl} alt={mainContact.name} />
              <AvatarFallback>{mainContact.name.charAt(0)}</AvatarFallback>
            </Avatar>
        )}
        <div>
           {!isBotChat && (
                <p className="text-lg font-bold font-headline">{`Tư vấn viên ${mainContact.name}`}</p>
           )}
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <p className="text-xs text-primary-foreground/80">Đang hoạt động</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20"><Phone /></Button>
            <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20"><Link href="/video-call"><Video /></Link></Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20" onClick={closeChat}><X /></Button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {conversation.messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} currentUser={currentUser} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <footer className="p-4 border-t bg-background flex-shrink-0">
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
