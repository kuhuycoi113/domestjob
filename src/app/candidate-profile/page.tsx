

'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Building, Cake, Dna, Edit, GraduationCap, MapPin, Phone, School, User, Award, Languages, Star, FileDown, Video, Image as ImageIcon, PlusCircle, Trash2, RefreshCw, X, Camera, MessageSquare, Facebook, Contact, UserCog, Trophy, PlayCircle, LogOut, FileSignature, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";
import type { CandidateProfile } from '@/ai/schemas';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


type MediaItem = {
  src: string;
  thumbnail?: string; 
  alt: string;
  dataAiHint: string;
};

type EnrichedCandidateProfile = CandidateProfile & { 
  avatarUrl?: string;
  videos: MediaItem[];
  images: MediaItem[];
};


const emptyCandidate: EnrichedCandidateProfile = {
    name: 'Chưa có thông tin',
    headline: 'Vui lòng tạo hồ sơ bằng AI hoặc cập nhật thủ công',
    location: 'Chưa có thông tin',
    about: '',
    education: [],
    experience: [],
    personalInfo: {
      birthYear: new Date().getFullYear(),
      gender: 'N/A',
      phone: 'N/A',
      language: 'N/A',
      dateOfBirth: 'N/A',
      height: 'N/A',
      weight: 'N/A',
      tattooStatus: 'N/A',
      hepatitisBStatus: 'N/A',
    },
    aspirations: {
        desiredLocation: 'N/A',
        desiredSalary: 'N/A',
        desiredNetSalary: 'N/A',
        financialAbility: 'N/A',
        interviewLocation: 'N/A',
        specialAspirations: 'N/A',
    },
    notes: '',
    interests: [],
    skills: [],
    certifications: [],
    desiredIndustry: 'N/A',
    avatarUrl: 'https://placehold.co/128x128.png',
    videos: [],
    images: [],
};


const commonSkills = ['Vận hành máy CNC', 'AutoCAD', 'Kiểm tra chất lượng', 'Làm việc nhóm', 'Giải quyết vấn đề', 'Tiếng Anh giao tiếp'];
const commonInterests = ['Cơ khí', 'Điện tử', 'IT', 'Logistics', 'Dệt may', 'Chế biến thực phẩm'];

const EditDialog = ({ children, title, onSave, content, description, contentClassName }: { children: React.ReactNode, title: string, onSave: () => void, content: React.ReactNode, description?: string, contentClassName?: string }) => (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className={cn("sm:max-w-[600px]", contentClassName)}>
            <DialogHeader>
                <DialogTitle className="font-headline text-2xl">{title}</DialogTitle>
                {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                {content}
            </div>
            <DialogFooter>
                <Button type="submit" onClick={onSave} className="bg-primary text-white">Lưu thay đổi</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

const ZaloIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 262 263" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M131 0C58.649 0 0 58.649 0 131C0 203.351 58.649 262 131 262C203.351 262 262 203.351 262 131C262 58.649 203.351 0 131 0ZM197.838 170.368L173.962 194.244C171.139 197.067 167.247 197.68 163.639 196.223L126.541 182.903C125.129 182.413 123.824 181.711 122.625 180.892L74.832 144.37C71.748 142.029 70.832 137.989 72.585 134.577L84.975 111.758C86.728 108.347 90.722 106.889 94.276 108.347L131.374 121.612C132.786 122.102 134.091 122.748 135.29 123.623L183.083 160.145C186.167 162.486 187.083 166.526 185.33 169.937L197.838 170.368Z" fill="#0068FF"/>
    </svg>
)

const StepByStepEditDialog = ({ trigger, tempCandidate, setTempCandidate, onSave }: { trigger: React.ReactNode, tempCandidate: EnrichedCandidateProfile, setTempCandidate: React.Dispatch<React.SetStateAction<EnrichedCandidateProfile | null>>, onSave: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 14;

    const handleNestedChange = (
      section: 'personalInfo' | 'aspirations', 
      field: string, 
      value: any
    ) => {
        setTempCandidate(prev => {
            if (!prev) return null;
            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            };
        });
    };

    const handleSimpleChange = (field: keyof EnrichedCandidateProfile, value: any) => {
        setTempCandidate(prev => {
            if (!prev) return null;
            return { ...prev, [field]: value };
        });
    };

    const fields = [
        { number: 1, label: 'Họ và tên', content: <Input placeholder="Nhập họ và tên" value={tempCandidate.name} onChange={e => handleSimpleChange('name', e.target.value)} /> },
        { number: 2, label: 'Giới tính', content: <Select value={tempCandidate.personalInfo.gender} onValueChange={v => handleNestedChange('personalInfo', 'gender', v)}><SelectTrigger><SelectValue placeholder="Chọn giới tính" /></SelectTrigger><SelectContent><SelectItem value="Nam">Nam</SelectItem><SelectItem value="Nữ">Nữ</SelectItem><SelectItem value="Khác">Khác</SelectItem></SelectContent></Select> },
        { number: 3, label: 'Ngày sinh', content: <Input type="date" value={tempCandidate.personalInfo.dateOfBirth || ''} onChange={e => handleNestedChange('personalInfo', 'dateOfBirth', e.target.value)} /> },
        { number: 4, label: 'Ngành nghề mong muốn', content: <Input placeholder="Chọn ngành nghề" value={tempCandidate.desiredIndustry} onChange={e => handleSimpleChange('desiredIndustry', e.target.value)} /> },
        { number: 5, label: 'Địa điểm mong muốn', content: <Input placeholder="Chọn địa điểm" value={tempCandidate.aspirations?.desiredLocation} onChange={e => handleNestedChange('aspirations', 'desiredLocation', e.target.value)} /> },
        { number: 6, label: 'Chiều cao', content: <Input placeholder="Nhập chiều cao (cm)" value={tempCandidate.personalInfo.height} onChange={e => handleNestedChange('personalInfo', 'height', e.target.value)} /> },
        { number: 7, label: 'Cân nặng', content: <Input placeholder="Nhập cân nặng (kg)" value={tempCandidate.personalInfo.weight} onChange={e => handleNestedChange('personalInfo', 'weight', e.target.value)} /> },
        { number: 8, label: 'Hình xăm', content: <Input placeholder="Nhập hình xăm" value={tempCandidate.personalInfo.tattooStatus} onChange={e => handleNestedChange('personalInfo', 'tattooStatus', e.target.value)} /> },
        { number: 9, label: 'Viêm gan B', content: <Input placeholder="Nhập tình trạng" value={tempCandidate.personalInfo.hepatitisBStatus} onChange={e => handleNestedChange('personalInfo', 'hepatitisBStatus', e.target.value)} /> },
        { number: 10, label: 'Lương cơ bản mong muốn/tháng', content: <Input placeholder="Nhập số tiền" value={tempCandidate.aspirations?.desiredSalary} onChange={e => handleNestedChange('aspirations', 'desiredSalary', e.target.value)} /> },
        { number: 11, label: 'Thực lĩnh mong muốn', content: <Input placeholder="Nhập số tiền" value={tempCandidate.aspirations?.desiredNetSalary} onChange={e => handleNestedChange('aspirations', 'desiredNetSalary', e.target.value)} /> },
        { number: 12, label: 'Khả năng tài chính', content: <Input placeholder="Nhập số tiền" value={tempCandidate.aspirations?.financialAbility} onChange={e => handleNestedChange('aspirations', 'financialAbility', e.target.value)} /> },
        { number: 13, label: 'Tìm việc, phỏng vấn, tuyển tại', content: <Input placeholder="Chọn địa điểm" value={tempCandidate.aspirations?.interviewLocation} onChange={e => handleNestedChange('aspirations', 'interviewLocation', e.target.value)} /> },
        { number: 14, label: 'Nguyện vọng đặc biệt', content: <Textarea placeholder="Chọn điều kiện" value={tempCandidate.aspirations?.specialAspirations} onChange={e => handleNestedChange('aspirations', 'specialAspirations', e.target.value)} /> },
    ];
    
    const currentField = fields.find(f => f.number === currentStep);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild onClick={() => setCurrentStep(1)}>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base font-semibold">{currentStep}/{totalSteps} - ĐĂNG THÔNG TIN TÌM VIỆC MỨC 1</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col justify-between min-h-[500px]">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold font-headline text-center">{currentField?.label}</h3>
                        <div className="px-4">
                            {currentField?.content}
                        </div>
                    </div>
                    <div className="px-4 pb-4">
                        <div className="text-xs text-muted-foreground leading-relaxed flex flex-wrap gap-x-2">
                            {fields.map(field => (
                                <button 
                                    key={field.number} 
                                    onClick={() => setCurrentStep(field.number)}
                                    className={cn(
                                        "inline-flex items-center hover:text-primary",
                                        currentStep === field.number && "text-primary font-bold"
                                    )}
                                >
                                    {field.label} {field.number < totalSteps && <ChevronRight className="h-3 w-3 ml-1" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                 <DialogFooter className="grid grid-cols-2 gap-2 pt-4 border-t">
                    {currentStep > 1 && (
                        <Button variant="outline" onClick={() => setCurrentStep(s => s - 1)}>Quay lại</Button>
                    )}
                    {currentStep <= totalSteps && (
                       <Button 
                        onClick={() => {
                            if (currentStep < totalSteps) {
                                setCurrentStep(s => s + 1)
                            } else {
                                onSave();
                                setIsOpen(false);
                            }
                        }}
                        className={cn("col-start-2", currentStep === 1 && "col-span-2")}
                       >
                           {currentStep < totalSteps ? 'Tiếp tục' : 'Đăng thông tin'}
                       </Button>
                    )}
                 </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default function CandidateProfilePage() {
  const [candidate, setCandidate] = useState<EnrichedCandidateProfile | null>(null);
  const [tempCandidate, setTempCandidate] = useState<EnrichedCandidateProfile | null>(null);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  useEffect(() => {
    const storedProfile = localStorage.getItem('generatedCandidateProfile');
    let profileToLoad: EnrichedCandidateProfile;

    const defaultImages: MediaItem[] = [
      { src: 'https://placehold.co/400x600.png', alt: 'Ảnh trước', dataAiHint: 'front view portrait' },
      { src: 'https://placehold.co/400x600.png', alt: 'Ảnh trái', dataAiHint: 'left side portrait' },
      { src: 'https://placehold.co/400x600.png', alt: 'Ảnh phải', dataAiHint: 'right side portrait' },
      { src: 'https://placehold.co/400x600.png', alt: 'Toàn thân trước', dataAiHint: 'full body front' },
      { src: 'https://placehold.co/400x600.png', alt: 'Toàn thân trái', dataAiHint: 'full body left' },
      { src: 'https://placehold.co/400x600.png', alt: 'Toàn thân phải', dataAiHint: 'full body right' },
    ];
    
    const defaultVideos: MediaItem[] = [
        { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://placehold.co/400x600.png', alt: 'Giới thiệu bản thân', dataAiHint: 'self introduction video' },
        { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://placehold.co/400x600.png', alt: 'Tay nghề 1', dataAiHint: 'skill demonstration' },
        { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://placehold.co/400x600.png', alt: 'Tay nghề 2', dataAiHint: 'welding skill' },
        { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://placehold.co/400x600.png', alt: 'Trả lời phỏng vấn', dataAiHint: 'interview answers' },
        { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://placehold.co/400x600.png', alt: 'Dự án đã làm', dataAiHint: 'project showcase' },
        { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://placehold.co/400x600.png', alt: 'Video khác', dataAiHint: 'personal video' },
    ];

    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        profileToLoad = {
          ...emptyCandidate,
          ...parsedProfile,
          personalInfo: { ...emptyCandidate.personalInfo, ...parsedProfile.personalInfo },
          aspirations: { ...emptyCandidate.aspirations, ...parsedProfile.aspirations },
          avatarUrl: parsedProfile.avatarUrl || 'https://placehold.co/128x128.png',
          videos: (parsedProfile.videos && parsedProfile.videos.length > 0) ? parsedProfile.videos : defaultVideos,
          images: (parsedProfile.images && parsedProfile.images.length > 0) ? parsedProfile.images : defaultImages,
        };
      } catch (error) {
        console.error("Failed to parse candidate profile from localStorage", error);
        profileToLoad = { ...emptyCandidate, videos: defaultVideos, images: defaultImages };
      }
    } else {
        profileToLoad = { ...emptyCandidate, 
            videos: defaultVideos,
            images: defaultImages
        };
    }
    setCandidate(profileToLoad);
    setTempCandidate(JSON.parse(JSON.stringify(profileToLoad)));
  }, []);

  useEffect(() => {
    if (candidate) {
      localStorage.setItem('generatedCandidateProfile', JSON.stringify(candidate));
    }
  }, [candidate]);


  if (!candidate || !tempCandidate) {
      return (
        <div className="bg-secondary">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="max-w-5xl mx-auto">
                    <Card className="shadow-2xl overflow-hidden">
                        <CardHeader className="p-0">
                            <Skeleton className="h-32 bg-gray-300" />
                            <div className="p-6 flex flex-col md:flex-row items-center md:items-end -mt-16">
                                <Skeleton className="h-32 w-32 rounded-full border-4 border-background bg-gray-400" />
                                <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left space-y-2">
                                    <Skeleton className="h-8 w-64" />
                                    <Skeleton className="h-6 w-80" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <Skeleton className="h-96 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      );
  }

  const handleSave = () => {
    setCandidate(JSON.parse(JSON.stringify(tempCandidate)));
  };
  
  const handleMediaChange = (type: 'avatar' | 'image', e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newUrl = reader.result as string;
        setTempCandidate(prev => {
          if (!prev) return null;
          const newCandidate = {...prev};
          if (type === 'avatar') {
             newCandidate.avatarUrl = newUrl;
          } else if (type === 'image' && index !== undefined) {
             newCandidate.images[index].src = newUrl;
          }
          // Also update the final candidate state to reflect change immediately
          setCandidate(JSON.parse(JSON.stringify(newCandidate)));
          return newCandidate;
        });
      };
      reader.readAsDataURL(file);
    }
  };


  const handleNestedChange = (
      section: 'personalInfo' | 'aspirations', 
      field: string, 
      value: any
  ) => {
      setTempCandidate(prev => {
          if (!prev) return null;
          return {
              ...prev,
              [section]: {
                  ...prev[section],
                  [field]: value
              }
          };
      });
  };

  const handleSimpleChange = (field: keyof EnrichedCandidateProfile, value: any) => {
    setTempCandidate(prev => {
        if (!prev) return null;
        return { ...prev, [field]: value };
    });
  };


  const handleChange = (section: keyof EnrichedCandidateProfile, index: number, field: string, value: any) => {
      setTempCandidate(prev => {
          if (!prev) return null;
          const newCandidate = { ...prev };
          // @ts-ignore
          if (Array.isArray(newCandidate[section])) {
            // @ts-ignore
            newCandidate[section][index][field] = value;
          }
          return newCandidate;
      });
  };

  const handleAddItem = (section: 'experience' | 'education' | 'certifications') => {
      setTempCandidate(prev => {
          if (!prev) return null;
          const newCandidate = { ...prev };
          if (section === 'experience') {
              newCandidate.experience.push({ company: '', role: '', period: '', description: '' });
          } else if (section === 'education') {
              newCandidate.education.push({ school: '', degree: '', gradYear: new Date().getFullYear() });
          } else if (section === 'certifications') {
              newCandidate.certifications.push('');
          }
          return newCandidate;
      });
  };

  const handleRemoveItem = (section: 'experience' | 'education' | 'certifications' | 'skills' | 'interests', indexOrValue: number | string) => {
      setTempCandidate(prev => {
          if (!prev) return null;
          const newCandidate = { ...prev };
          if (section === 'skills' || section === 'interests') {
              // @ts-ignore
              newCandidate[section] = newCandidate[section].filter(item => item !== indexOrValue);
          } else {
            // @ts-ignore
            newCandidate[section].splice(indexOrValue, 1);
          }
          return newCandidate;
      });
  };
  
  const handleCertificationChange = (index: number, value: string) => {
      setTempCandidate(prev => {
          if (!prev) return null;
          const newCandidate = { ...prev };
          newCandidate.certifications[index] = value;
          return newCandidate;
      });
  };
  
  const handleCheckboxChange = (field: 'skills' | 'interests', value: string) => {
    setTempCandidate(prev => {
        if (!prev) return null;
        const newCandidate = { ...prev };
        const currentValues = newCandidate[field];
        const newValues = currentValues.includes(value)
          ? currentValues.filter((item: string) => item !== value)
          : [...currentValues, value];
        // @ts-ignore
        newCandidate[field] = newValues;
        return newCandidate;
    });
  };

  const handleAddNewChip = (field: 'skills' | 'interests') => {
      if (!tempCandidate) return;
      const valueToAdd = field === 'skills' ? newSkill.trim() : newInterest.trim();
      if (valueToAdd && !tempCandidate[field].includes(valueToAdd)) {
          setTempCandidate(prev => ({
              ...prev!,
              // @ts-ignore
              [field]: [...prev![field], valueToAdd]
          }));
          if (field === 'skills') {
              setNewSkill('');
          } else {
              setNewInterest('');
          }
      }
  };

  const Level1EditDialogContent = () => {
    const fields = [
        { number: 1, label: 'Họ và tên' }, { number: 2, label: 'Giới tính' },
        { number: 3, label: 'Ngày sinh' }, { number: 4, label: 'Ngành nghề mong muốn' },
        { number: 5, label: 'Địa điểm mong muốn' }, { number: 6, label: 'Chiều cao' },
        { number: 7, label: 'Cân nặng' }, { number: 8, label: 'Hình xăm' },
        { number: 9, label: 'Viêm gan B' }, { number: 10, label: 'Lương cơ bản mong muốn/tháng' },
        { number: 11, label: 'Thực lĩnh mong muốn' }, { number: 12, label: 'Khả năng tài chính' },
        { number: 13, label: 'Tìm việc, phỏng vấn, tuyển tại' }, { number: 14, label: 'Nguyện vọng đặc biệt' }
    ];

    return (
        <Accordion type="single" collapsible className="w-full">
            {fields.map((field) => (
                <AccordionItem value={`item-${field.number}`} key={field.number}>
                    <StepByStepEditDialog
                        tempCandidate={tempCandidate}
                        setTempCandidate={setTempCandidate}
                        onSave={handleSave}
                        trigger={
                             <AccordionTrigger className="w-full text-left no-underline hover:no-underline">
                                {`${field.number}. ${field.label}`}
                            </AccordionTrigger>
                        }
                    />
                </AccordionItem>
            ))}
        </Accordion>
    );
  };
  
  const experienceEditDialogContent = (
      <div className="space-y-6">
          {tempCandidate.experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2 relative">
                  <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold">Kinh nghiệm #{index + 1}</h4>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveItem('experience', index)}>
                          <Trash2 className="h-4 w-4 text-destructive"/>
                      </Button>
                  </div>
                  <Label>Vai trò</Label>
                  <Input value={exp.role} onChange={e => handleChange('experience', index, 'role', e.target.value)} />
                  <Label>Công ty</Label>
                  <Input value={exp.company} onChange={e => handleChange('experience', index, 'company', e.target.value)} />
                  <Label>Thời gian</Label>
                  <Input value={exp.period} onChange={e => handleChange('experience', index, 'period', e.target.value)} />
                  <Label>Mô tả</Label>
                  <Textarea value={exp.description} onChange={e => handleChange('experience', index, 'description', e.target.value)} />
              </div>
          ))}
          <Button variant="outline" className="w-full" onClick={() => handleAddItem('experience')}>
              <PlusCircle className="mr-2"/> Thêm kinh nghiệm
          </Button>
      </div>
  );
  
  const educationEditDialogContent = (
      <div className="space-y-6">
          {tempCandidate.education.map((edu, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2 relative">
                  <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold">Học vấn #{index + 1}</h4>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveItem('education', index)}>
                          <Trash2 className="h-4 w-4 text-destructive"/>
                      </Button>
                  </div>
                  <Label>Trường</Label>
                  <Input value={edu.school} onChange={e => handleChange('education', index, 'school', e.target.value)} />
                  <Label>Chuyên ngành</Label>
                  <Input value={edu.degree} onChange={e => handleChange('education', index, 'degree', e.target.value)} />
                  <Label>Năm tốt nghiệp</Label>
                  <Input type="number" value={edu.gradYear} onChange={e => handleChange('education', index, 'gradYear', parseInt(e.target.value))} />
              </div>
          ))}
          <Button variant="outline" className="w-full" onClick={() => handleAddItem('education')}>
              <PlusCircle className="mr-2"/> Thêm học vấn
          </Button>
      </div>
  );
  
  const skillsInterestsEditDialogContent = (
      <div className="space-y-6">
          <div className="space-y-2">
              <Label className="font-bold">Kỹ năng</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                  {tempCandidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="pr-1">
                          {skill}
                          <button onClick={() => handleRemoveItem('skills', skill)} className="ml-2 rounded-full hover:bg-destructive/80 p-0.5">
                              <X className="h-3 w-3" />
                          </button>
                      </Badge>
                  ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonSkills.filter(s => !tempCandidate.skills.includes(s)).map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox id={`skill-${skill}`} onCheckedChange={() => handleCheckboxChange('skills', skill)} checked={tempCandidate.skills.includes(skill)}/>
                      <Label htmlFor={`skill-${skill}`} className="text-sm font-normal cursor-pointer">{skill}</Label>
                    </div>
                  ))}
              </div>
              <div className="flex gap-2 mt-2">
                  <Input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Thêm kỹ năng khác..." />
                  <Button onClick={() => handleAddNewChip('skills')}>Thêm</Button>
              </div>
          </div>
           <div className="space-y-2">
              <Label className="font-bold">Lĩnh vực quan tâm</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                  {tempCandidate.interests.map((interest) => (
                      <Badge key={interest} className="bg-accent-blue text-white pr-1">
                          {interest}
                          <button onClick={() => handleRemoveItem('interests', interest)} className="ml-2 rounded-full hover:bg-destructive/80 p-0.5">
                              <X className="h-3 w-3" />
                          </button>
                      </Badge>
                  ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonInterests.filter(i => !tempCandidate.interests.includes(i)).map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox id={`interest-${interest}`} onCheckedChange={() => handleCheckboxChange('interests', interest)} checked={tempCandidate.interests.includes(interest)}/>
                      <Label htmlFor={`interest-${interest}`} className="text-sm font-normal cursor-pointer">{interest}</Label>
                    </div>
                  ))}
              </div>
              <div className="flex gap-2 mt-2">
                  <Input value={newInterest} onChange={e => setNewInterest(e.target.value)} placeholder="Thêm lĩnh vực khác..." />
                  <Button onClick={() => handleAddNewChip('interests')}>Thêm</Button>
              </div>
          </div>
      </div>
  );
  
  const certificationsEditDialogContent = (
       <div className="space-y-6">
          {tempCandidate.certifications.map((cert, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2 relative">
                   <div className="flex justify-between items-center mb-2">
                      <Label htmlFor={`cert-${index}`}>Chứng chỉ #{index + 1}</Label>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveItem('certifications', index)}>
                          <Trash2 className="h-4 w-4 text-destructive"/>
                      </Button>
                  </div>
                  <Input id={`cert-${index}`} value={cert} onChange={(e) => handleCertificationChange(index, e.target.value)} />
              </div>
          ))}
          <Button variant="outline" className="w-full" onClick={() => handleAddItem('certifications')}>
              <PlusCircle className="mr-2"/> Thêm chứng chỉ
          </Button>
       </div>
  );

  const mainEditDialogContent = (
    <div className="space-y-4">
        <div className="text-center">
             <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                <FileSignature className="h-12 w-12 text-primary" />
             </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <Dialog>
                <DialogTrigger asChild>
                    <Card className="p-4 text-center cursor-pointer hover:shadow-lg transition-shadow border-2 border-accent-orange">
                        <h4 className="font-bold text-accent-orange">Mức 1</h4>
                        <User className="h-12 w-12 text-gray-300 mx-auto my-2" />
                        <p className="text-sm text-muted-foreground">(Thông tin cơ bản)</p>
                    </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-2xl">ĐĂNG THÔNG TIN TÌM VIỆC MỨC 1</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[70vh] overflow-y-auto pr-4">
                      <Level1EditDialogContent />
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSave} className="bg-accent-orange text-white w-full">ĐĂNG THÔNG TIN</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Card className="p-4 text-center cursor-pointer hover:shadow-lg transition-shadow border-2 border-accent-green">
                        <h4 className="font-bold text-accent-green">Mức 2</h4>
                        <Briefcase className="h-12 w-12 text-gray-300 mx-auto my-2" />
                        <p className="text-sm text-muted-foreground">(Thông tin đầy đủ)</p>
                    </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader><DialogTitle>Chỉnh sửa Kinh nghiệm & Học vấn</DialogTitle></DialogHeader>
                    <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-4">
                        <h3 className="font-bold text-lg">Kinh nghiệm</h3>
                        {experienceEditDialogContent}
                        <h3 className="font-bold text-lg mt-4">Học vấn</h3>
                        {educationEditDialogContent}
                    </div>
                    <DialogFooter><Button onClick={handleSave}>Lưu</Button></DialogFooter>
                </DialogContent>
            </Dialog>
            
            <Dialog>
                <DialogTrigger asChild>
                    <Card className="p-4 text-center cursor-pointer hover:shadow-lg transition-shadow border-2 border-accent">
                        <h4 className="font-bold text-accent">Mức 3</h4>
                        <Contact className="h-12 w-12 text-gray-300 mx-auto my-2" />
                        <div className="flex justify-center items-center gap-2 mt-1">
                            <Facebook className="h-5 w-5 text-blue-600" />
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                            <ZaloIcon className="h-5 w-5" />
                            <Phone className="h-5 w-5 text-green-500" />
                        </div>
                        <p className="text-sm text-muted-foreground">(Thông tin liên hệ)</p>
                    </Card>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader><DialogTitle>Chỉnh sửa Thông tin liên hệ</DialogTitle></DialogHeader>
                    {/* Placeholder for now */}
                    <div>Coming soon...</div>
                    <DialogFooter><Button onClick={handleSave}>Lưu</Button></DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
        <p className="text-center mt-4 text-muted-foreground">Để <span className="text-primary font-semibold">Nhà tuyển dụng</span> hiểu rõ về bạn, hãy <span className="text-green-500 font-semibold">Cập nhật thông tin</span>.</p>
    </div>
  );
  
  const MediaCarousel = ({ items, title }: { items: MediaItem[], title: string }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-headline text-xl flex items-center"><Video className="mr-3 text-primary"/> {title}</CardTitle>
          <Button variant="ghost" size="icon"><PlusCircle className="h-5 w-5"/></Button>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full" opts={{align: "start", loop: true}}>
            <CarouselContent className="-ml-2 md:-ml-4">
                {items.slice(0, 6).map((item, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-[30%] md:basis-1/3 lg:basis-1/4">
                       <div className="relative group overflow-hidden rounded-lg aspect-[9/16] cursor-pointer">
                            <Image src={item.thumbnail || item.src} alt={item.alt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.dataAiHint} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <PlayCircle className="h-12 w-12 text-white/80 drop-shadow-lg" />
                            </div>
                            <div className="absolute bottom-2 left-2 text-white text-xs font-semibold drop-shadow-md p-1 bg-black/40 rounded">
                                {item.alt}
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
        </Carousel>
      </CardContent>
    </Card>
  );

  const BodyPhotosCarousel = ({items, onImageChange}: {items: MediaItem[], onImageChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline text-xl flex items-center"><ImageIcon className="mr-3 text-primary"/> Ảnh hình thể</CardTitle>
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon"><PlusCircle className="h-5 w-5"/></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cập nhật ảnh hình thể</DialogTitle>
                        <DialogDescription>Tải lên các ảnh theo yêu cầu để hoàn thiện hồ sơ.</DialogDescription>
                    </DialogHeader>
                    {/* Add management UI here if needed */}
                </DialogContent>
             </Dialog>
        </CardHeader>
        <CardContent>
            <Carousel className="w-full" opts={{align: "start"}}>
                <CarouselContent className="-ml-2 md:-ml-4">
                    {items.map((item, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5">
                           <div className="space-y-2">
                                <div className="relative group aspect-[3/4] rounded-lg overflow-hidden border">
                                     <Image src={item.src} alt={item.alt} fill className="object-cover" data-ai-hint={item.dataAiHint} />
                                     <Label htmlFor={`image-upload-${index}`} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Camera className="h-8 w-8 text-white"/>
                                     </Label>
                                     <Input id={`image-upload-${index}`} type="file" className="hidden" accept="image/*" onChange={(e) => onImageChange(e, index)} />
                                </div>
                                <p className="text-center text-sm font-semibold text-muted-foreground">{item.alt}</p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </CardContent>
    </Card>
  )


  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-2xl overflow-hidden">
             <CardHeader className="p-0">
               <div className="bg-gradient-to-tr from-primary to-accent h-32" />
                 <div className="p-6 flex flex-col md:flex-row items-center md:items-end -mt-16">
                 <div className="relative group">
                     <Avatar className="h-32 w-32 border-4 border-background bg-background shadow-lg">
                      <AvatarImage src={candidate.avatarUrl} alt={candidate.name} data-ai-hint="professional headshot" className="object-cover" />
                      <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Label htmlFor="avatar-upload" className="absolute bottom-1 right-1 cursor-pointer bg-black/50 text-white p-2 rounded-full group-hover:bg-black/70 transition-colors">
                        <Camera className="h-5 w-5" />
                        <span className="sr-only">Change avatar</span>
                    </Label>
                    <Input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleMediaChange('avatar', e)}/>
                 </div>
                <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                  <h1 className="text-3xl font-headline font-bold">{candidate.name}</h1>
                  <p className="text-muted-foreground">{candidate.headline}</p>
                  <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
                    <MapPin className="h-4 w-4" /> {candidate.location}
                  </p>
                </div>
                 <EditDialog
                    title="Sửa hồ sơ tìm việc"
                    onSave={() => { /* No-op, saves happen in sub-dialogs */ }}
                    content={mainEditDialogContent}
                    description="Chọn một mục dưới đây để cập nhật hoặc hoàn thiện thông tin hồ sơ của bạn."
                    contentClassName="sm:max-w-4xl"
                 >
                    <Button className="md:ml-auto mt-4 md:mt-0" variant="outline"><Edit /> Sửa hồ sơ</Button>
                 </EditDialog>
              </div>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-headline text-xl flex items-center"><User className="mr-3 text-primary"/> Giới thiệu bản thân</CardTitle>
                     <EditDialog
                        title="Chỉnh sửa Giới thiệu bản thân"
                        onSave={handleSave}
                        content={<Textarea value={tempCandidate.about} onChange={e => handleSimpleChange('about', e.target.value)} rows={6} />}
                        description="Viết một đoạn giới thiệu ngắn về bản thân, kỹ năng và mục tiêu nghề nghiệp của bạn."
                    >
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                    </EditDialog>
                  </CardHeader>
                  <CardContent>
                    {candidate.about ? (
                      <p className="text-muted-foreground whitespace-pre-line">{candidate.about}</p>
                    ) : (
                      <div className="text-muted-foreground">
                        <span>Chưa có thông tin. </span>
                        <EditDialog title="Chỉnh sửa Giới thiệu bản thân" onSave={handleSave} content={<Textarea value={tempCandidate.about} onChange={e => handleSimpleChange('about', e.target.value)} rows={6} />}>
                            <button className="text-primary hover:underline">Nhấn vào đây để cập nhật</button>
                        </EditDialog>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {candidate.videos.length > 0 && <MediaCarousel items={candidate.videos} title="Video" />}
                
                {candidate.images.length > 0 && <BodyPhotosCarousel items={candidate.images} onImageChange={(e, index) => handleMediaChange('image', e, index)} />}


                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-headline text-xl flex items-center"><Briefcase className="mr-3 text-primary"/> Kinh nghiệm làm việc</CardTitle>
                     <EditDialog
                        title="Chỉnh sửa Kinh nghiệm làm việc"
                        onSave={handleSave}
                        content={experienceEditDialogContent}
                    >
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                     </EditDialog>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {candidate.experience.length > 0 ? candidate.experience.map((exp, index) => (
                        <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary">
                            <h4 className="font-bold">{exp.role}</h4>
                            <p className="font-semibold text-sm text-primary">{exp.company}</p>
                            <p className="text-xs text-muted-foreground mb-1">{exp.period}</p>
                            <p className="text-sm text-muted-foreground">{exp.description}</p>
                        </div>
                    )) : (
                        <div className="text-muted-foreground">
                           <span>Chưa có thông tin. </span>
                            <EditDialog title="Chỉnh sửa Kinh nghiệm làm việc" onSave={handleSave} content={experienceEditDialogContent}>
                               <button className="text-primary hover:underline">Nhấn vào đây để cập nhật</button>
                            </EditDialog>
                        </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-headline text-xl flex items-center"><GraduationCap className="mr-3 text-primary"/> Học vấn</CardTitle>
                     <EditDialog
                        title="Chỉnh sửa Học vấn"
                        onSave={handleSave}
                        content={educationEditDialogContent}
                    >
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                    </EditDialog>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {candidate.education.length > 0 ? candidate.education.map((edu, index) => (
                        <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary">
                            <p className="font-semibold flex items-center gap-2"><School className="h-4 w-4"/> {edu.school}</p>
                            <p className="text-muted-foreground ml-6">Chuyên ngành: {edu.degree}</p>
                            <p className="text-muted-foreground ml-6">Tốt nghiệp năm: {edu.gradYear}</p>
                        </div>
                     )) : (
                        <div className="text-muted-foreground">
                            <span>Chưa có thông tin. </span>
                            <EditDialog title="Chỉnh sửa Học vấn" onSave={handleSave} content={educationEditDialogContent}>
                                <button className="text-primary hover:underline">Nhấn vào đây để cập nhật</button>
                            </EditDialog>
                        </div>
                     )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-1 space-y-6">
                 <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center"><UserCog className="mr-3 text-primary"/> Thông tin cá nhân</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p className="flex items-start gap-3"><strong>Ngày sinh:</strong> {candidate.personalInfo.dateOfBirth}</p>
                    <p className="flex items-start gap-3"><strong>Giới tính:</strong> {candidate.personalInfo.gender}</p>
                    <p className="flex items-start gap-3"><strong>Chiều cao:</strong> {candidate.personalInfo.height}</p>
                    <p className="flex items-start gap-3"><strong>Cân nặng:</strong> {candidate.personalInfo.weight}</p>
                    <p className="flex items-start gap-3"><strong>Ngành mong muốn:</strong> {candidate.desiredIndustry}</p>
                  </CardContent>
                </Card>

                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-headline text-xl flex items-center"><Star className="mr-3 text-primary"/> Kỹ năng & Lĩnh vực</CardTitle>
                    <EditDialog
                        title="Chỉnh sửa Kỹ năng & Lĩnh vực"
                        description="Chọn các mục có sẵn hoặc thêm mới để làm nổi bật hồ sơ của bạn."
                        onSave={handleSave}
                        content={skillsInterestsEditDialogContent}
                    >
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                    </EditDialog>
                  </CardHeader>
                  <CardContent>
                     <h4 className="font-semibold mb-2 text-sm">Kỹ năng</h4>
                     <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.skills.length > 0 ? candidate.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>) : 
                        <div className="text-muted-foreground text-sm">
                            <span>Chưa có kỹ năng. </span>
                            <EditDialog title="Chỉnh sửa Kỹ năng & Lĩnh vực" description="Chọn các mục có sẵn hoặc thêm mới để làm nổi bật hồ sơ của bạn." onSave={handleSave} content={skillsInterestsEditDialogContent}>
                               <button className="text-primary hover:underline">Nhấn vào đây để cập nhật</button>
                            </EditDialog>
                        </div>}
                     </div>
                     <h4 className="font-semibold mb-2 text-sm">Lĩnh vực quan tâm</h4>
                     <div className="flex flex-wrap gap-2">
                        {candidate.interests.length > 0 ? candidate.interests.map(interest => <Badge key={interest} className="bg-accent-blue text-white">{interest}</Badge>) : 
                        <div className="text-muted-foreground text-sm">
                            <span>Chưa có lĩnh vực quan tâm. </span>
                            <EditDialog title="Chỉnh sửa Kỹ năng & Lĩnh vực" description="Chọn các mục có sẵn hoặc thêm mới để làm nổi bật hồ sơ của bạn." onSave={handleSave} content={skillsInterestsEditDialogContent}>
                                <button className="text-primary hover:underline">Nhấn vào đây để cập nhật</button>
                            </EditDialog>
                        </div>}
                     </div>
                  </CardContent>
                </Card>

                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-headline text-xl flex items-center"><Award className="mr-3 text-primary"/> Chứng chỉ & Giải thưởng</CardTitle>
                     <EditDialog
                        title="Chỉnh sửa Chứng chỉ & Giải thưởng"
                        onSave={handleSave}
                        content={certificationsEditDialogContent}
                    >
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                    </EditDialog>
                  </CardHeader>
                  <CardContent className="space-y-2">
                     {candidate.certifications.length > 0 ? candidate.certifications.map((cert, index) => (
                         <p key={index} className="text-sm flex items-center gap-2"><Trophy className="h-4 w-4 text-muted-foreground"/>{cert}</p>
                     )) : 
                     <div className="text-muted-foreground text-sm">
                        <span>Chưa có chứng chỉ. </span>
                        <EditDialog title="Chỉnh sửa Chứng chỉ & Giải thưởng" onSave={handleSave} content={certificationsEditDialogContent}>
                            <button className="text-primary hover:underline">Nhấn vào đây để cập nhật</button>
                        </EditDialog>
                    </div>}
                  </CardContent>
                </Card>

                 <Button className="w-full bg-accent-green hover:bg-accent-green/90 text-white"><FileDown/> Tải CV (.pdf)</Button>
                 <div className="text-center pt-4">
                    <Button variant="link" className="text-muted-foreground text-sm" onClick={() => { /* Handle logout */ }}>
                        <LogOut className="mr-2 h-4 w-4"/>
                        Đăng xuất
                    </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
