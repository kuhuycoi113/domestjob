
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Conversation, Message, User, conversations, currentUser, helloJobBot, consultants } from '@/lib/chat-data';

interface ChatContextType {
  isChatOpen: boolean;
  activeConversation: Conversation | null;
  openChat: (user?: User) => void;
  closeChat: () => void;
  sendMessage: (text: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

const getAssignedConsultant = (): User | null => {
    if (typeof window === 'undefined') return null;
    const consultantId = localStorage.getItem('assignedConsultantId');
    if (consultantId) {
        return consultants.find(c => c.id === consultantId) || null;
    }
    return null;
};

const assignRandomConsultant = (): User => {
    const randomConsultant = consultants[Math.floor(Math.random() * consultants.length)];
    if (typeof window !== 'undefined') {
        localStorage.setItem('assignedConsultantId', randomConsultant.id);
    }
    return randomConsultant;
};


export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  const openChat = (user?: User) => {
    let targetUser = user;

    // If no specific user is provided, use the assignment logic
    if (!targetUser) {
        targetUser = getAssignedConsultant() || assignRandomConsultant();
    }
    
    // Default to bot if something goes wrong
    if (!targetUser) {
        targetUser = helloJobBot;
    }


    // Find if a conversation with this user already exists
    let conversation = conversations.find(c => c.participants.some(p => p.id === targetUser!.id));
    
    // If not, create a new one for the demo
    if (!conversation) {
        conversation = {
            id: `convo-${targetUser!.id}`,
            participants: [currentUser, targetUser!],
            messages: [
                {
                    id: `msg-${Date.now()}`,
                    sender: targetUser!,
                    text: `Chào bạn, tôi là ${targetUser!.name}. Tôi có thể giúp gì cho bạn?`,
                    timestamp: new Date().toISOString()
                }
            ]
        }
        // In a real app, you might not want to push this to the static array
        // but for demo purposes, this makes it seem persistent.
        if (!conversations.some(c => c.id === conversation!.id)) {
            conversations.push(conversation);
        }
    }
    
    setActiveConversation(conversation);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    // setActiveConversation(null); // Optional: clear conversation on close
  };

  const sendMessage = (text: string) => {
    if (!activeConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      text: text,
      timestamp: new Date().toISOString(),
    };

    // Update the conversation state
    const updatedMessages = [...activeConversation.messages, newMessage];
    const updatedConversation = { ...activeConversation, messages: updatedMessages };
    setActiveConversation(updatedConversation);
    
    // Update the master conversations array
    const convoIndex = conversations.findIndex(c => c.id === activeConversation.id);
    if(convoIndex !== -1) {
        conversations[convoIndex] = updatedConversation;
    }


    // Simulate AI/Bot response
    const mainContact = updatedConversation.participants.find(p => p.id !== currentUser.id) || helloJobBot;
    setTimeout(() => {
        const aiResponse: Message = {
            id: `msg-${Date.now() + 1}`,
            sender: mainContact,
            text: `Cảm ơn bạn đã liên hệ. Hệ thống đã ghi nhận câu hỏi: "${text}". Một tư vấn viên sẽ phản hồi sớm nhất có thể.`,
            timestamp: new Date().toISOString(),
        };
        
        setActiveConversation(prev => {
            if (!prev) return null;
            const latestMessages = [...prev.messages, aiResponse];
            const latestConvo = { ...prev, messages: latestMessages };
            
            const idx = conversations.findIndex(c => c.id === latestConvo.id);
            if(idx !== -1) conversations[idx] = latestConvo;

            return latestConvo;
        });

    }, 1500);
  };

  const value = {
    isChatOpen,
    activeConversation,
    openChat,
    closeChat,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
