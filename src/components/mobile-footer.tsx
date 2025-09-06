
'use client';

import Link from 'next/link';
import { Home, Sparkles, User, LogOut, PlusCircle, Shield, FileText, MessageSquareWarning, LayoutGrid, X, Compass, BookOpen, LifeBuoy, Info, Handshake, ChevronDown, Gem, UserPlus, Briefcase, MessageSquare } from 'lucide-react';
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
import Image from 'next/image';


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
    { href: '/feedback', label: 'Góp ý', icon: MessageSquareWarning },
    { href: '/premium', label: 'Nâng cấp Premium', icon: Gem },
    { href: '/referral', label: 'Giới thiệu bạn bè', icon: UserPlus },
];

const Logo = () => (
    <Image src="/img/HJPNG.png" alt="HelloJob Logo" width={110} height={36} className="h-9 w-auto" />
);

export function MobileFooter() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const footerLinks = [
    { href: '/', icon: Home, label: 'Trang chủ' },
    { href: '/ai-profile', icon: Sparkles, label: 'Hồ sơ AI' },
    { href: '/jobs', icon: Briefcase, label: 'Việc làm' },
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
                 <Link href="/candidate-profile" className="block" onClick={() => setIsOpen(false)}>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary hover:bg-accent/20">
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
