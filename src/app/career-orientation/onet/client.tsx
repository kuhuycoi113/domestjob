
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Search, ThumbsUp, TrendingUp, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { onetData, HollandOnetMapping } from '@/lib/onet-data';
import type { HollandCode } from '@/lib/onet-data';

export default function OnetClientPage() {
  const router = useRouter();
  const [hollandCode, setHollandCode] = useState<HollandCode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedCode = localStorage.getItem('hollandResultCode') as HollandCode;
    if (storedCode) {
      setHollandCode(storedCode);
    }
    setIsLoading(false);
  }, []);
  
  const simulateHollandTest = () => {
    // Scores: R=4, I=14, A=14, S=12, E=14, C=12
    // Top scores are I, A, E. We'll pick 'I' as the primary result.
    const topCode: HollandCode = 'I';
    localStorage.setItem('hollandResultCode', topCode);
    setHollandCode(topCode); // Update state to re-render
  };

  if (isLoading) {
    return (
        <div className="bg-secondary py-16 md:py-24">
             <div className="container mx-auto px-4 md:px-6">
                <div className="text-center">
                    <p>Đang tải dữ liệu...</p>
                </div>
            </div>
        </div>
    );
  }

  if (!hollandCode) {
    return (
      <div className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-2xl mx-auto text-center p-8">
            <CardHeader>
                <BrainCircuit className="h-16 w-16 mx-auto text-primary mb-4"/>
              <CardTitle className="font-headline text-3xl">Hoàn thành Trắc nghiệm Holland trước</CardTitle>
              <CardDescription className="text-lg mt-2">
                Để có được những gợi ý nghề nghiệp chính xác nhất từ O*NET, bạn cần thực hiện bài trắc nghiệm sở thích Holland để chúng tôi hiểu rõ hơn về bạn.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/career-orientation/holland">
                  Làm bài test Holland ngay <ArrowRight className="ml-2" />
                </Link>
              </Button>
               <Button size="sm" variant="link" onClick={simulateHollandTest}>
                  Đã có kết quả? Xem gợi ý nghề nghiệp ngay
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  const mapping = HollandOnetMapping[hollandCode];
  const suggestedCareers = onetData.filter(job => mapping.onet_codes.includes(job.code));

  return (
    <div className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
            Gợi ý nghề nghiệp O*NET
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Dựa trên kết quả trắc nghiệm Holland của bạn - Nhóm <span className="font-bold text-accent">{mapping.name}</span>, đây là những ngành nghề phù hợp nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedCareers.map(job => (
                <Card key={job.code} className="flex flex-col">
                    <CardHeader>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>{job.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="space-y-3">
                             <div className="flex items-start">
                                <ThumbsUp className="h-5 w-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold">Công việc chính</h4>
                                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                        {job.tasks.slice(0, 2).map(task => <li key={task}>{task}</li>)}
                                    </ul>
                                </div>
                            </div>
                             <div className="flex items-start">
                                <TrendingUp className="h-5 w-5 mr-3 mt-1 text-blue-500 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold">Triển vọng nghề nghiệp tại Nhật</h4>
                                     <p className="text-sm text-muted-foreground">{job.outlook_jp}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
