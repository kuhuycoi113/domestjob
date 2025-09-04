
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
import { VideoCallDialog } from '../video-call-dialog';

interface ChatWindowProps {
  conversation: Conversation;
}

export function ChatWindow({ conversation }: ChatWindowProps) {
  const { sendMessage, closeChat } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
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

  const handleVideoCallClick = () => {
    // On mobile, navigate to the page. On desktop, open the dialog.
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // This requires useRouter, but for now we'll just use Link's behavior
      // A more robust solution might use router.push('/video-call');
    } else {
      setIsCallDialogOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full bg-secondary">
        {/* Header */}
        <header className="flex items-center gap-3 p-3 border-b bg-primary text-primary-foreground shadow-md flex-shrink-0">
          <div className="flex-shrink-0">
            {isBotChat ? (
              <div className="bg-white rounded-full p-1.5 h-10 w-10 flex items-center justify-center">
                <Logo className="h-5 w-auto" />
              </div>
            ) : (
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={mainContact.avatarUrl} alt={mainContact.name} />
                <AvatarFallback>{mainContact.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
          </div>

          <div>
             <p className="text-sm font-bold font-headline leading-tight">{isBotChat ? 'HelloJob' : `Tư vấn viên ${mainContact.name}`}</p>
             <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <p className="text-xs text-primary-foreground/80 font-semibold">Đang hoạt động</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20"><Phone /></Button>
              {/* For mobile, this Link will work. For desktop, the onClick will be triggered. */}
              <Link href="/video-call" passHref legacyBehavior>
                <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20" onClick={handleVideoCallClick}>
                   <a><Video /></a>
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
      <VideoCallDialog isOpen={isCallDialogOpen} onClose={() => setIsCallDialogOpen(false)} />
    </>
  );
}
