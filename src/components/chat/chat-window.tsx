
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
  
  // In a real app, the assigned consultant might change.
  // For now, we'll pick the first non-user participant as the main contact.
  const mainContact = conversation.participants.find(p => p.id !== currentUser.id) || users[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // --- AI/Bot Logic Simulation ---
    // In a real app, this would call a server-side AI flow.
    // The AI would process `newMessage` and decide on a response.
    // If it can respond, it crafts a message. If not, it flags for a human.
    // For this demo, we'll simulate a delayed AI response impersonating the main contact.
    setTimeout(() => {
        const aiResponse: Message = {
            id: `msg-${Date.now() + 1}`,
            sender: mainContact, // AI responds as the consultant
            text: `Cảm ơn bạn đã liên hệ. Hệ thống đã ghi nhận câu hỏi của bạn về "${newMessage}". Một tư vấn viên sẽ phản hồi sớm nhất có thể.`,
            timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, aiResponse]);
    }, 1500);
    // --- End Simulation ---
  };

  return (
    <div className="flex flex-col h-full bg-secondary">
      {/* Header */}
      <header className="flex items-center gap-4 p-3 border-b bg-primary text-primary-foreground shadow-md">
        <Avatar className="h-10 w-10 border-2 border-white">
          <AvatarImage src={mainContact.avatarUrl} alt={mainContact.name} />
          <AvatarFallback>{mainContact.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-bold font-headline">{mainContact.name}</p>
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
