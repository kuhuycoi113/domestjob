
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Briefcase, Send, Upload, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

// Represents all possible fields
type JobData = {
    title: string;
    visaDetail: string;
    industry: string;
    workLocation: string;
    interviewLocation: string;
    gender: string;
    quantity: string;
    ageRequirement: string;
    languageRequirement: string;
    languageProficiency: string;
    netFee: string;
    basicSalary: string;
    netSalary: string;
    interviewDate: string;
    description: string;
    requirements: string;
    benefits: string;
};

// Maps visa detail to the fields that are NOT applicable
const hiddenFieldsByVisa: { [key: string]: (keyof JobData)[] } = {
    'Thực tập sinh 3 năm': ['languageRequirement', 'languageProficiency'],
    'Thực tập sinh 1 năm': ['languageRequirement', 'languageProficiency'],
    'Thực tập sinh 3 Go': ['languageRequirement', 'languageProficiency'],
    'Đặc định đầu Việt': [],
    'Đặc định đầu Nhật': ['netFee', 'interviewLocation'],
    'Đặc định đi mới': [],
    'Kỹ sư, tri thức đầu Việt': ['netFee'],
    'Kỹ sư, tri thức đầu Nhật': ['netFee', 'interviewLocation']
};


export default function PartnerPostJobPage() {
  const [activeTab, setActiveTab] = useState('manual');
  const { toast } = useToast();
  const router = useRouter();
  const [jobData, setJobData] = useState<Partial<JobData>>({
    title: '',
    visaDetail: '',
    industry: '',
    workLocation: '',
    interviewLocation: '',
    gender: '',
    quantity: '1',
    ageRequirement: '18-69',
    languageRequirement: '',
    languageProficiency: '',
    netFee: '',
    basicSalary: '',
    netSalary: '',
    interviewDate: '',
    description: '',
    requirements: '',
    benefits: '',
  });
  
  const [visibleFields, setVisibleFields] = useState<Set<keyof JobData>>(new Set(Object.keys(jobData)));

  const handleInputChange = (field: keyof JobData, value: string) => {
    const newData = { ...jobData, [field]: value };

    if (field === 'visaDetail') {
      const hidden = hiddenFieldsByVisa[value] || [];
      const allFields: (keyof JobData)[] = Object.keys(jobData) as (keyof JobData)[];
      const newVisibleFields = new Set(allFields.filter(f => !hidden.includes(f)));
      setVisibleFields(newVisibleFields);
    }
    
    // Reset proficiency when language changes
    if (field === 'languageRequirement') {
        newData.languageProficiency = '';
    }

    setJobData(newData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // Simulate AI processing and pre-filling the form
      const mockData: Partial<JobData> = {
        title: "Kỹ sư Vận hành Dây chuyền Tự động",
        visaDetail: "Kỹ sư, tri thức đầu Việt",
        industry: "Điện tử",
        workLocation: "Khu công nghệ cao Hòa Lạc, Hà Nội",
        gender: "Cả nam và nữ",
        quantity: "5",
        ageRequirement: "22-35",
        languageRequirement: "Tiếng Nhật",
        languageProficiency: "N4",
        basicSalary: '200,000 yên/tháng',
        netSalary: '160,000 yên/tháng',
        description: "- Chịu trách nhiệm vận hành, giám sát và bảo trì các dây chuyền sản xuất tự động.\n- Đảm bảo các máy móc hoạt động ổn định, đạt năng suất và chất lượng theo yêu cầu.\n- Phối hợp với các bộ phận khác để xử lý sự cố và cải tiến quy trình.",
        requirements: "- Tốt nghiệp Cao đẳng/Đại học chuyên ngành Cơ điện tử, Tự động hóa hoặc các ngành liên quan.\n- Có ít nhất 1 năm kinh nghiệm ở vị trí tương đương.\n- Có khả năng đọc hiểu bản vẽ kỹ thuật.",
        benefits: "- Mức lương cạnh tranh, thỏa thuận theo năng lực.\n- Môi trường làm việc chuyên nghiệp, năng động.\n- Được hưởng đầy đủ các chế độ phúc lợi theo quy định của pháp luật."
      };
      setJobData(mockData);
      
      const hidden = hiddenFieldsByVisa[mockData.visaDetail!] || [];
      const allFields: (keyof JobData)[] = Object.keys(jobData) as (keyof JobData)[];
      setVisibleFields(new Set(allFields.filter(f => !hidden.includes(f))));
      
      setActiveTab('manual');
      toast({
          title: "Phân tích thành công!",
          description: "Thông tin từ tệp của bạn đã được điền vào biểu mẫu.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Submitting job data:", jobData);
      toast({
          title: "Đăng tin thành công!",
          description: "Tin tuyển dụng của bạn đã được đăng và sẽ được chuyển hướng đến bảng điều khiển.",
          className: "bg-green-500 text-white"
      });
      setTimeout(() => {
          router.push('/partner/dashboard');
      }, 1500);
  }
  
  const visaTypes = Object.keys(hiddenFieldsByVisa);
  const japaneseLevels = ["N1", "N2", "N3", "N4", "N5", "N5 trở lên", "Không yêu cầu"];
  const englishLevels = ["Giao tiếp cơ bản", "Giao tiếp tốt", "Thành thạo", "Không yêu cầu"];

  const getMinInterviewDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const getMaxInterviewDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 60);
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                <Briefcase className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="font-headline text-4xl">Đăng tin tuyển dụng</CardTitle>
              <CardDescription className="!mt-3 text-lg">
                Tiếp cận hàng ngàn ứng viên tiềm năng trên hệ thống HelloJob.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="ai">Đăng bằng AI</TabsTrigger>
                  <TabsTrigger value="manual">Đăng thủ công</TabsTrigger>
                </TabsList>
                
                <TabsContent value="ai">
                   <div className="text-center p-6 border rounded-lg border-dashed">
                      <h3 className="text-xl font-bold font-headline mb-2">Tải lên tin tuyển dụng có sẵn</h3>
                      <p className="text-muted-foreground mb-6">Hệ thống sẽ tự động phân tích và điền thông tin vào biểu mẫu giúp bạn.</p>
                      <div className="relative border-2 border-dashed border-border rounded-lg p-10 flex flex-col items-center justify-center hover:border-primary transition-colors">
                          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="mb-2 text-foreground">Kéo thả tệp hoặc <span className="font-bold text-primary">chọn tệp</span></p>
                          <p className="text-xs text-muted-foreground">Hỗ trợ PDF, DOCX, PNG, JPG</p>
                          <Input id="ai-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                      </div>
                   </div>
                </TabsContent>

                <TabsContent value="manual">
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Job Information */}
                    <div className="space-y-4 p-6 border rounded-lg">
                      <h3 className="text-xl font-bold font-headline">Thông tin việc làm</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="job-title">Chức danh</Label>
                          <Input id="job-title" placeholder="VD: Kỹ sư vận hành máy CNC" value={jobData.title} onChange={(e) => handleInputChange('title', e.target.value)} required/>
                        </div>

                         <div className="space-y-2">
                          <Label htmlFor="visa-detail">Chi tiết loại hình visa</Label>
                          <Select value={jobData.visaDetail} onValueChange={(value) => handleInputChange('visaDetail', value)} required>
                            <SelectTrigger id="visa-detail"><SelectValue placeholder="Chọn loại hình visa chi tiết" /></SelectTrigger>
                            <SelectContent>
                              {visaTypes.map(vt => <SelectItem key={vt} value={vt}>{vt}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="job-industry">Ngành nghề</Label>
                          <Input id="job-industry" placeholder="VD: Cơ khí" value={jobData.industry} onChange={(e) => handleInputChange('industry', e.target.value)} required/>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="job-location">Địa điểm làm việc</Label>
                          <Input id="job-location" placeholder="VD: Aichi, Nhật Bản" value={jobData.workLocation} onChange={(e) => handleInputChange('workLocation', e.target.value)} required/>
                        </div>
                        
                        {visibleFields.has('interviewLocation') && (
                            <div className="space-y-2">
                                <Label htmlFor="interview-location">Phỏng vấn, tuyển tại</Label>
                                <Input id="interview-location" placeholder="VD: Hà Nội" value={jobData.interviewLocation} onChange={(e) => handleInputChange('interviewLocation', e.target.value)} />
                            </div>
                        )}
                        
                        <div className="space-y-2">
                           <Label htmlFor="gender">Giới tính</Label>
                           <Select value={jobData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                             <SelectTrigger id="gender"><SelectValue placeholder="Chọn yêu cầu giới tính" /></SelectTrigger>
                             <SelectContent>
                               <SelectItem value="Nam">Nam</SelectItem>
                               <SelectItem value="Nữ">Nữ</SelectItem>
                               <SelectItem value="Cả nam và nữ">Cả nam và nữ</SelectItem>
                             </SelectContent>
                           </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="quantity">Số lượng tuyển (1-100)</Label>
                          <Input id="quantity" type="number" min="1" max="100" placeholder="VD: 5" value={jobData.quantity} onChange={(e) => handleInputChange('quantity', e.target.value)} required/>
                        </div>
                        
                        <div className="space-y-2">
                           <Label htmlFor="age-requirement">Yêu cầu độ tuổi</Label>
                           <Input id="age-requirement" placeholder="VD: 18-35" value={jobData.ageRequirement} onChange={(e) => handleInputChange('ageRequirement', e.target.value)} />
                        </div>
                        
                        {visibleFields.has('languageRequirement') && (
                            <div className="space-y-2">
                                <Label htmlFor="language-requirement">Yêu cầu ngoại ngữ</Label>
                                <Select value={jobData.languageRequirement} onValueChange={(value) => handleInputChange('languageRequirement', value)}>
                                    <SelectTrigger id="language-requirement">
                                        <SelectValue placeholder="Chọn yêu cầu ngoại ngữ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Tiếng Nhật">Tiếng Nhật</SelectItem>
                                        <SelectItem value="Tiếng Anh">Tiếng Anh</SelectItem>
                                        <SelectItem value="Không yêu cầu tiếng">Không yêu cầu tiếng</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {visibleFields.has('languageProficiency') && jobData.languageRequirement === 'Tiếng Nhật' && (
                            <div className="space-y-2">
                                <Label htmlFor="language-proficiency-jp">Trình độ tiếng Nhật</Label>
                                <Select value={jobData.languageProficiency} onValueChange={(value) => handleInputChange('languageProficiency', value)}>
                                    <SelectTrigger id="language-proficiency-jp">
                                        <SelectValue placeholder="Chọn trình độ tiếng Nhật" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {japaneseLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {visibleFields.has('languageProficiency') && jobData.languageRequirement === 'Tiếng Anh' && (
                            <div className="space-y-2">
                                <Label htmlFor="language-proficiency-en">Trình độ tiếng Anh</Label>
                                <Select value={jobData.languageProficiency} onValueChange={(value) => handleInputChange('languageProficiency', value)}>
                                    <SelectTrigger id="language-proficiency-en">
                                        <SelectValue placeholder="Chọn trình độ tiếng Anh" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {englishLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                         <div className="space-y-2">
                            <Label htmlFor="interview-date">Ngày phỏng vấn</Label>
                            <Input
                                id="interview-date"
                                type="date"
                                value={jobData.interviewDate}
                                onChange={(e) => handleInputChange('interviewDate', e.target.value)}
                                min={getMinInterviewDate()}
                                max={getMaxInterviewDate()}
                            />
                        </div>
                        
                        {visibleFields.has('netFee') && (
                           <div className="space-y-2">
                               <Label htmlFor="net-fee">Mức phí (nếu có)</Label>
                               <Input id="net-fee" placeholder="VD: 100tr hoặc 4000$" value={jobData.netFee} onChange={(e) => handleInputChange('netFee', e.target.value)} />
                           </div>
                        )}
                        
                         <div className="space-y-2">
                               <Label htmlFor="basic-salary">Lương cơ bản</Label>
                               <Input id="basic-salary" placeholder="100,000 - 2,000,000 yên/tháng" value={jobData.basicSalary} onChange={(e) => handleInputChange('basicSalary', e.target.value)} required/>
                         </div>

                          <div className="space-y-2">
                               <Label htmlFor="net-salary">Thực lĩnh (ước tính)</Label>
                               <Input id="net-salary" placeholder="60,000 - 1,500,000 yên/tháng" value={jobData.netSalary} onChange={(e) => handleInputChange('netSalary', e.target.value)} />
                         </div>

                      </div>
                    </div>

                    {/* Job Description */}
                    <div className="space-y-4 p-6 border rounded-lg">
                      <h3 className="text-xl font-bold font-headline">Mô tả chi tiết</h3>
                      <div className="space-y-2">
                          <Label htmlFor="job-description">Mô tả công việc</Label>
                          <Textarea id="job-description" placeholder="Mô tả công việc, trách nhiệm..." rows={5} value={jobData.description} onChange={(e) => handleInputChange('description', e.target.value)} required/>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="job-requirements">Yêu cầu ứng viên</Label>
                          <Textarea id="job-requirements" placeholder="Yêu cầu về kỹ năng, kinh nghiệm, học vấn..." rows={5} value={jobData.requirements} onChange={(e) => handleInputChange('requirements', e.target.value)} required/>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="job-benefits">Quyền lợi</Label>
                          <Textarea id="job-benefits" placeholder="Phúc lợi, lương thưởng, cơ hội phát triển..." rows={3} value={jobData.benefits} onChange={(e) => handleInputChange('benefits', e.target.value)} required/>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required/>
                        <Label htmlFor="terms" className="text-sm text-muted-foreground">Tôi đồng ý với các <a href="#" className="underline text-primary">điều khoản dịch vụ</a> của HelloJob.</Label>
                    </div>

                    <div className="text-center pt-4">
                        <Button size="lg" type="submit" className="bg-primary text-white w-full md:w-auto">
                            <Send className="mr-2"/> Đăng tin ngay
                        </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
