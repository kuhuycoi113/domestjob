'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { MobileFooter } from '@/components/mobile-footer';
import { ChatProvider } from '@/contexts/ChatContext';
import { FloatingChatWidget } from '@/components/chat/floating-chat-widget';

export function RootProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isCallPage = pathname.startsWith('/video-call') || pathname.startsWith('/voice-call');

    return (
        <ChatProvider>
            {!isCallPage && <Header />}
            <main className="min-h-screen">{children}</main>
            {!isCallPage && <Footer />}
            {!isCallPage && <MobileFooter />}
            {!isCallPage && <FloatingChatWidget />}
            <Toaster />
        </ChatProvider>
    );
}
