
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { type CandidateProfile } from '@/ai/schemas';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type EnrichedCandidateProfile = Omit<CandidateProfile, 'education' | 'experience' | 'skills' | 'interests' | 'certifications' | 'about' | 'headline' | 'location'> & {
    avatarUrl?: string;
};


const emptyData: EnrichedCandidateProfile = {
    name: '',
    personalInfo: {
        birthYear: 0,
        gender: '',
        phone: '',
        language: '',
        dateOfBirth: '',
        height: '',
        weight: '',
        tattooStatus: '',
        hepatitisBStatus: '',
    },
    aspirations: {
        desiredLocation: '',
        desiredSalary: '',
        desiredNetSalary: '',
        financialAbility: '',
        interviewLocation: '',
        specialAspirations: '',
    },
    notes: '',
    desiredIndustry: '',
};

const FormField = ({ label, number, children }: { label: string, number: number, children: React.ReactNode }) => (
    <AccordionItem value={`item-${number}`} className="border-b-0">
        <AccordionTrigger className="bg-white rounded-lg px-4 py-2 hover:no-underline">
             <div className="flex items-center">
                <span className="font-semibold text-lg w-10">{number}.</span>
                <span className="font-semibold">{label}</span>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </AccordionTrigger>
        <AccordionContent className="p-4 bg-secondary">
             {children}
        </AccordionContent>
    </AccordionItem>
)

export default function EditLevel1Page() {
    const router = useRouter();
    const { toast } = useToast();
    const [formData, setFormData] = useState<EnrichedCandidateProfile>(emptyData);
     const [openAccordion, setOpenAccordion] = useState('item-1');


    useEffect(() => {
        const storedProfile = localStorage.getItem('generatedCandidateProfile');
        if (storedProfile) {
            try {
                const parsed = JSON.parse(storedProfile);
                setFormData(prev => ({
                    ...prev,
                    ...parsed,
                    personalInfo: { ...prev.personalInfo, ...parsed.personalInfo },
                    aspirations: { ...prev.aspirations, ...parsed.aspirations }
                }));
            } catch (error) {
                console.error("Failed to parse profile from storage", error);
            }
        }
    }, []);

    const handleSimpleChange = (field: keyof EnrichedCandidateProfile, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (section: 'personalInfo' | 'aspirations', field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Merge with existing full profile to not lose other data
            const storedProfile = localStorage.getItem('generatedCandidateProfile');
            const fullProfile = storedProfile ? JSON.parse(storedProfile) : {};
            const updatedProfile = { ...fullProfile, ...formData };
            localStorage.setItem('generatedCandidateProfile', JSON.stringify(updatedProfile));
            toast({
                title: "Lưu thành công",
                description: "Thông tin Mức 1 của bạn đã được cập nhật.",
                className: "bg-green-500 text-white"
            });
            router.push('/candidate-profile');
        } catch (error) {
             toast({
                variant: 'destructive',
                title: "Có lỗi xảy ra",
                description: "Không thể lưu thông tin. Vui lòng thử lại.",
            });
        }
    };
    
    const formFields = [
        { number: 1, label: 'Họ và tên', content: <Input placeholder="Nhập họ và tên" value={formData.name} onChange={e => handleSimpleChange('name', e.target.value)} /> },
        { number: 2, label: 'Giới tính', content: <Select value={formData.personalInfo.gender} onValueChange={v => handleNestedChange('personalInfo', 'gender', v)}><SelectTrigger><SelectValue placeholder="Chọn giới tính" /></SelectTrigger><SelectContent><SelectItem value="Nam">Nam</SelectItem><SelectItem value="Nữ">Nữ</SelectItem><SelectItem value="Khác">Khác</SelectItem></SelectContent></Select> },
        { number: 3, label: 'Ngày sinh', content: <Input type="date" value={formData.personalInfo.dateOfBirth} onChange={e => handleNestedChange('personalInfo', 'dateOfBirth', e.target.value)} /> },
        { number: 4, label: 'Ngành nghề mong muốn', content: <Input placeholder="Chọn ngành nghề" value={formData.desiredIndustry} onChange={e => handleSimpleChange('desiredIndustry', e.target.value)} /> },
        { number: 5, label: 'Địa điểm mong muốn', content: <Input placeholder="Chọn địa điểm" value={formData.aspirations.desiredLocation} onChange={e => handleNestedChange('aspirations', 'desiredLocation', e.target.value)} /> },
        { number: 6, label: 'Chiều cao', content: <Input type="number" placeholder="Nhập chiều cao (cm)" value={formData.personalInfo.height} onChange={e => handleNestedChange('personalInfo', 'height', e.target.value)} /> },
        { number: 7, label: 'Cân nặng', content: <Input type="number" placeholder="Nhập cân nặng (kg)" value={formData.personalInfo.weight} onChange={e => handleNestedChange('personalInfo', 'weight', e.target.value)} /> },
        { number: 8, label: 'Hình xăm', content: <Select value={formData.personalInfo.tattooStatus} onValueChange={v => handleNestedChange('personalInfo', 'tattooStatus', v)}><SelectTrigger><SelectValue placeholder="Nhập tình trạng hình xăm" /></SelectTrigger><SelectContent><SelectItem value="Không có">Không có</SelectItem><SelectItem value="Xăm nhỏ">Xăm nhỏ</SelectItem><SelectItem value="Xăm lớn">Xăm lớn</SelectItem></SelectContent></Select> },
        { number: 9, label: 'Viêm gan B', content: <Select value={formData.personalInfo.hepatitisBStatus} onValueChange={v => handleNestedChange('personalInfo', 'hepatitisBStatus', v)}><SelectTrigger><SelectValue placeholder="Nhập tình trạng" /></SelectTrigger><SelectContent><SelectItem value="Không viêm gan B">Không viêm gan B</SelectItem><SelectItem value="Có viêm gan B">Có viêm gan B</SelectItem></SelectContent></Select> },
        { number: 10, label: 'Lương cơ bản mong muốn/tháng', content: <Input placeholder="Nhập số tiền" value={formData.aspirations.desiredSalary} onChange={e => handleNestedChange('aspirations', 'desiredSalary', e.target.value)} /> },
        { number: 11, label: 'Thực lĩnh mong muốn', content: <Input placeholder="Nhập số tiền" value={formData.aspirations.desiredNetSalary} onChange={e => handleNestedChange('aspirations', 'desiredNetSalary', e.target.value)} /> },
        { number: 12, label: 'Khả năng tài chính', content: <Input placeholder="Nhập số tiền" value={formData.aspirations.financialAbility} onChange={e => handleNestedChange('aspirations', 'financialAbility', e.target.value)} /> },
        { number: 13, label: 'Tìm việc, phỏng vấn, tuyển tại', content: <Input placeholder="Chọn địa điểm" value={formData.aspirations.interviewLocation} onChange={e => handleNestedChange('aspirations', 'interviewLocation', e.target.value)} /> },
        { number: 14, label: 'Nguyện vọng đặc biệt', content: <Textarea placeholder="Chọn điều kiện" value={formData.aspirations.specialAspirations} onChange={e => handleNestedChange('aspirations', 'specialAspirations', e.target.value)} /> },
    ];


    return (
        <div className="bg-secondary min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-xl mx-auto">
                    <header className="mb-8 text-center">
                         <Button variant="ghost" onClick={() => router.back()} className="absolute top-6 left-4 text-muted-foreground">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Quay lại
                        </Button>
                        <h1 className="text-2xl font-bold font-headline">ĐĂNG THÔNG TIN TÌM VIỆC MỨC 1</h1>
                    </header>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <Accordion type="single" collapsible value={openAccordion} onValueChange={setOpenAccordion} className="w-full">
                           {formFields.map(field => (
                               <FormField key={field.number} number={field.number} label={field.label}>
                                   {field.content}
                               </FormField>
                           ))}
                        </Accordion>
                         <div className="pt-6">
                            <Button size="lg" type="submit" className="w-full bg-accent-orange text-black hover:bg-accent-orange/90 font-bold text-lg">
                                ĐĂNG THÔNG TIN
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
