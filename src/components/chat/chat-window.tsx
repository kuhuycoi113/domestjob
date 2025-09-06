
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
import Image from 'next/image';
import { VideoCallDialog } from '../video-call-dialog';
import { VoiceCallDialog } from '../voice-call-dialog';
import { usePathname } from 'next/navigation';

interface ChatWindowProps {
  conversation: Conversation;
}

const Logo = () => (
    <Image src="/img/favi2.png" alt="HelloJob Logo" width={80} height={26} className="h-6 w-auto" />
);

export function ChatWindow({ conversation }: ChatWindowProps) {
  const { sendMessage, closeChat } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [isVideoCallDialogOpen, setIsVideoCallDialogOpen] = useState(false);
  const [isVoiceCallDialogOpen, setIsVoiceCallDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  
  const mainContact = conversation.participants.find(p => p.id !== currentUser.id) || users[0];
  const isBotChat = mainContact.isBot;


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  const handleVideoCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        closeChat();
        // The navigation will proceed via the Link component
    } else {
      e.preventDefault();
      setIsVideoCallDialogOpen(true);
    }
  };

  const handleVoiceCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        closeChat();
        // The navigation will proceed via the Link component
    } else {
      e.preventDefault();
      setIsVoiceCallDialogOpen(true);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
      // Here you can add logic to upload the file or display a preview
    }
  };

  return (
    <>
      <div className="flex flex-col h-full bg-secondary">
        {/* Header */}
        <header className="flex items-center gap-3 p-3 border-b bg-primary text-primary-foreground shadow-md flex-shrink-0">
          <div className="flex-shrink-0">
             <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={mainContact.avatarUrl} alt={mainContact.name} />
                <AvatarFallback>{mainContact.name.charAt(0)}</AvatarFallback>
              </Avatar>
          </div>

          <div>
             <div className="flex items-center gap-2">
                 <p className="text-sm font-bold font-headline leading-tight">HelloJob</p>
                 <div className="w-2 h-2 rounded-full bg-green-400"></div>
             </div>
            <p className="text-xs text-primary-foreground/80 font-semibold">Đang hoạt động</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
              <Link href={`/voice-call?redirect=${encodeURIComponent(pathname)}`} onClick={handleVoiceCallClick}>
                 <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">
                    <div><Phone /></div>
                 </Button>
              </Link>
              <Link href={`/video-call?redirect=${encodeURIComponent(pathname)}`} onClick={handleVideoCallClick}>
                <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">
                   <div><Video /></div>
                </Button>
              </Link>
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
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange} 
              accept="image/*,video/*"
            />
            <div className="flex items-center gap-1">
              <Button type="button" variant="ghost" size="icon" className="text-muted-foreground" onClick={handleFileButtonClick}><Paperclip /></Button>
              <Button type="button" variant="ghost" size="icon" className="text-muted-foreground"><ImageIcon /></Button>
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
      <VideoCallDialog isOpen={isVideoCallDialogOpen} onClose={() => setIsVideoCallDialogOpen(false)} />
      <VoiceCallDialog isOpen={isVoiceCallDialogOpen} onClose={() => setIsVoiceCallDialogOpen(false)} />
    </>
  );
}
