
'use client';

import Link from 'next/link';
import { Home, Sparkles, User, LogOut, PlusCircle, Shield, FileText, MessageSquareWarning, LayoutGrid, X, Compass, BookOpen, LifeBuoy, Info, Handshake, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenuSeparator } from './ui/dropdown-menu';
import { VnFlagIcon, JpFlagIcon, EnFlagIcon } from './custom-icons';


const quickAccessLinks = [
    { href: '/roadmap', label: 'Lộ trình', icon: Compass },
    { href: '/learn', label: 'E-Learning', icon: BookOpen },
    { href: '/handbook', label: 'Cẩm nang', icon: LifeBuoy },
    { href: '/about', label: 'Giới thiệu', icon: Info },
    { href: '/ai-profile', label: 'Tạo hồ sơ AI', icon: Sparkles },
    { href: '/post-job', label: 'Đăng tuyển dụng', icon: PlusCircle },
    { href: '/dashboard', label: 'Dữ liệu & Báo cáo', icon: FileText },
    { href: '/franchise', label: 'Đối tác tại Nhật', icon: Handshake },
    { href: '/consultant-profile', label: 'Tư vấn viên', icon: User },
    { href: '#', label: 'Góp ý', icon: MessageSquareWarning },
];

const Logo = () => (
    <span className="text-2xl font-black font-headline">
      <span className="text-accent">H</span>
      <span className="text-accent-orange">e</span>
      <span className="text-primary">l</span>
      <span className="text-accent-orange">l</span>
      <span className="text-accent-green">o</span>
      <span className="text-primary">Job</span>
    </span>
);

export function MobileFooter() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const footerLinks = [
    { href: '/', icon: Home, label: 'Trang chủ' },
    { href: '/ai-profile', icon: Sparkles, label: 'Tạo hồ sơ AI' },
    { href: '/candidate-profile', icon: User, label: 'Hồ sơ' },
  ];
  

  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <div className="flex justify-around items-center h-16">
        {footerLinks.map(({ href, icon: Icon, label }) => {
           const isActive = (pathname === href) || (pathname.startsWith(href) && href !== '/');
           return (
            <Link href={href} key={href} className="flex flex-col items-center justify-center text-xs text-muted-foreground hover:text-primary transition-colors w-1/4 pt-1">
              <Icon className={cn("h-6 w-6 mb-1", isActive ? 'text-primary' : '')} />
              <span className={cn( "text-center leading-tight", isActive ? 'text-primary font-bold' : '')}>{label}</span>
            </Link>
           )
        })}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
             <button className="flex flex-col items-center justify-center text-xs text-muted-foreground hover:text-primary transition-colors w-1/4 pt-1">
               <LayoutGrid className="h-6 w-6 mb-1" />
               <span className="text-center leading-tight">Menu</span>
             </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm flex flex-col p-0">
            <SheetHeader className="p-4 border-b flex flex-row items-center justify-between">
               <SheetTitle asChild>
                 <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Logo />
                  </Link>
               </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="p-4">
                 <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="user avatar" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-base font-medium leading-none">HelloJob</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Cán bộ tuyển dụng
                      </p>
                    </div>
                 </div>
                 <Button asChild variant="outline" className="mt-4 w-full" onClick={() => setIsOpen(false)}>
                    <Link href="/candidate-profile">Hồ sơ của tôi</Link>
                 </Button>
              </div>
              
              <DropdownMenuSeparator />

              <div className="p-2">
                 <div className="grid grid-cols-3 gap-2">
                    {quickAccessLinks.map((link) => (
                       <Link 
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center justify-start p-2 h-24 cursor-pointer rounded-md bg-secondary hover:bg-accent/80">
                         <div className="h-10 flex items-center justify-center text-primary"><link.icon className="h-8 w-8"/></div>
                         <span className="text-xs text-center leading-tight font-medium">{link.label}</span>
                       </Link>
                    ))}
                </div>
              </div>
              
              <div className="mt-auto p-4">
                  <DropdownMenuSeparator />
                  <SheetClose asChild>
                    <Button variant="ghost" className="w-full justify-center mt-4">
                        <X className="mr-2 h-4 w-4"/> Đóng
                      </Button>
                  </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </footer>
  );
}
