
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Conversation, Message, User, conversations, currentUser, helloJobBot, consultants } from '@/lib/chat-data';
import { recommendJobs, type JobRecommendationResponse, type RecommendedJob } from '@/ai/flows/recommend-jobs-flow';
import { JobCard } from '@/components/job-card';
import { jobData } from '@/lib/mock-data';

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

    if (!targetUser) {
        // When opening a general chat, always start with the HelloJob Bot.
        targetUser = helloJobBot;
    }
    
    let conversation = conversations.find(c => c.participants.some(p => p.id === targetUser!.id));
    
    if (!conversation) {
        const initialMessage = targetUser.isBot 
            ? "Chào bạn, tôi là trợ lý AI của HelloJob. Bạn đang tìm kiếm loại công việc nào? Hãy mô tả mong muốn của bạn nhé!"
            : `Chào bạn, tôi là ${targetUser!.name}. Tôi có thể giúp gì cho bạn?`;
        
        conversation = {
            id: `convo-${targetUser!.id}`,
            participants: [currentUser, targetUser!],
            messages: [
                {
                    id: `msg-${Date.now()}`,
                    sender: targetUser!,
                    text: initialMessage,
                    timestamp: new Date().toISOString()
                }
            ]
        }
        if (!conversations.some(c => c.id === conversation!.id)) {
            conversations.push(conversation);
        }
    }
    
    setActiveConversation(conversation);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const sendMessage = async (text: string) => {
    if (!activeConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      text: text,
      timestamp: new Date().toISOString(),
    };

    const updatedConversation = { 
        ...activeConversation, 
        messages: [...activeConversation.messages, newMessage] 
    };
    setActiveConversation(updatedConversation);
    
    const convoIndex = conversations.findIndex(c => c.id === activeConversation.id);
    if(convoIndex !== -1) {
        conversations[convoIndex] = updatedConversation;
    }

    const mainContact = updatedConversation.participants.find(p => p.id !== currentUser.id) || helloJobBot;
    
    // If talking to the bot, call the AI flow
    if (mainContact.isBot) {
        const loadingMessage: Message = {
            id: `msg-loading-${Date.now()}`,
            sender: mainContact,
            text: '...',
            isLoading: true,
            timestamp: new Date().toISOString(),
        };
        setActiveConversation(prev => prev ? { ...prev, messages: [...prev.messages, loadingMessage] } : null);

        try {
            const aiResult = await recommendJobs(text);
            const aiResponseMessage: Message = {
                id: `msg-ai-${Date.now()}`,
                sender: mainContact,
                text: aiResult.message,
                recommendations: aiResult.recommendations,
                timestamp: new Date().toISOString(),
            };

            setActiveConversation(prev => {
                if (!prev) return null;
                const filteredMessages = prev.messages.filter(m => !m.isLoading);
                const newMessages = [...filteredMessages, aiResponseMessage];
                const newConvo = { ...prev, messages: newMessages };
                
                const idx = conversations.findIndex(c => c.id === newConvo.id);
                if (idx !== -1) conversations[idx] = newConvo;

                return newConvo;
            });

        } catch (error) {
             console.error("AI Recommendation Error:", error);
             const errorMessage: Message = {
                id: `msg-error-${Date.now()}`,
                sender: mainContact,
                text: 'Rất tiếc, đã có lỗi xảy ra khi tìm kiếm việc làm. Bạn có muốn kết nối với một tư vấn viên không?',
                timestamp: new Date().toISOString(),
             };
             setActiveConversation(prev => {
                if (!prev) return null;
                const filteredMessages = prev.messages.filter(m => !m.isLoading);
                const newMessages = [...filteredMessages, errorMessage];
                const newConvo = { ...prev, messages: newMessages };
                
                const idx = conversations.findIndex(c => c.id === newConvo.id);
                if (idx !== -1) conversations[idx] = newConvo;

                return newConvo;
            });
        }
    } else {
        // Simulate human consultant response
        setTimeout(() => {
            const consultantResponse: Message = {
                id: `msg-${Date.now() + 1}`,
                sender: mainContact,
                text: `Cảm ơn bạn đã liên hệ. Hệ thống đã ghi nhận câu hỏi: "${text}". Tôi sẽ phản hồi sớm nhất có thể.`,
                timestamp: new Date().toISOString(),
            };
            
            setActiveConversation(prev => {
                if (!prev) return null;
                const latestMessages = [...prev.messages, consultantResponse];
                const latestConvo = { ...prev, messages: latestMessages };
                
                const idx = conversations.findIndex(c => c.id === latestConvo.id);
                if(idx !== -1) conversations[idx] = latestConvo;

                return latestConvo;
            });

        }, 1500);
    }
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
