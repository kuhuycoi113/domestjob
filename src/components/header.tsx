
'use client';

import Link from 'next/link';
import { Briefcase, Menu, X, Building, PlusCircle, User, LogOut, Shield, FileText, Gift, MessageSquareWarning, Settings, LifeBuoy, LayoutGrid, Sparkles, BookOpen, Compass, Home, Info, Handshake, ChevronDown, Gem, UserPlus, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Image from 'next/image';

const mainNavLinks = [
  { href: '/', label: 'Trang chủ'},
  { href: '/roadmap', label: 'Lộ trình' },
  { href: '/career-orientation', label: 'Hướng nghiệp' },
  { href: '/ai-profile', label: 'Tạo hồ sơ AI', icon: Sparkles },
  { href: '/learn', label: 'E-Learning' },
  { href: '/handbook', label: 'Cẩm nang'},
  { href: '/about', label: 'Giới thiệu' },
];

const quickAccessLinks = [
    { href: '/ai-profile', label: 'Tạo hồ sơ AI', icon: Sparkles },
    { href: '/roadmap', label: 'Lộ trình', icon: Compass },
    { href: '/learn', label: 'E-Learning', icon: BookOpen },
    { href: '/post-job', label: 'Đăng tuyển dụng', icon: PlusCircle },
    { href: '/dashboard', label: 'Dữ liệu & Báo cáo', icon: FileText },
    { href: '/franchise', label: 'Đối tác tại Nhật', icon: Handshake },
    { href: '/consultant-profile', label: 'Tư vấn viên', icon: User },
    { href: '/handbook', label: 'Cẩm nang', icon: LifeBuoy },
    { href: '/about', label: 'Giới thiệu', icon: Info },
    { href: '/feedback', label: 'Góp ý', icon: MessageSquareWarning },
    { href: '/premium', label: 'Nâng cấp Premium', icon: Gem },
    { href: '/referral', label: 'Giới thiệu bạn bè', icon: UserPlus },
];


export const Logo = ({ className }: { className?: string }) => (
    <Image src="/img/HJPNG.png" alt="HelloJob Logo" width={120} height={40} className={cn("h-10 w-auto", className)} priority />
);

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label, className, icon: Icon, onClick }: { href: string; label: string, className?: string, icon?: React.ElementType, onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => (
    <Link
      href={href}
      className={cn(
        'transition-colors hover:text-primary py-2 block font-medium flex items-center gap-2',
        (pathname === href || (pathname.startsWith(href) && href !== '/')) ? 'text-primary font-bold' : 'text-foreground/80',
        className
      )}
       onClick={(e) => {
        if(onClick) onClick(e);
      }}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {label}
    </Link>
  );
  
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === '/') {
        e.preventDefault();
        window.location.reload();
      }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {mainNavLinks.map((link) => (
             <NavLink 
                key={link.href} 
                href={link.href}
                label={link.label}
                icon={link.href === '/ai-profile' ? link.icon : undefined}
                onClick={link.href === '/' ? handleHomeClick : undefined} 
             />
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="outline">
                <Link href="/jobs">Trang quản lý</Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon" className="rounded-full">
                  <LayoutGrid className="h-5 w-5" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[360px]" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/candidate-profile" className="block hover:bg-accent rounded-md p-2 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="user avatar" />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-base font-medium leading-none">Lê Ngọc Hân</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          Ứng viên Thực tập sinh
                        </p>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <div className="grid grid-cols-4 gap-2 p-2">
                     {quickAccessLinks.map((link) => (
                         <DropdownMenuItem asChild key={link.href}>
                           <Link href={link.href} className="flex flex-col items-center justify-start p-2 h-20 cursor-pointer rounded-md hover:bg-accent">
                             <div className="h-8 flex items-center justify-center"><link.icon/></div>
                             <span className="text-xs text-center leading-tight">{link.label}</span>
                           </Link>
                        </DropdownMenuItem>
                     ))}
                  </div>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

        </div>
        <div className="md:hidden">
            <Button asChild size="icon">
                <Link href="/chat">
                    <MessageSquare />
                    <span className="sr-only">Chat</span>
                </Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
