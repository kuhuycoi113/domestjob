import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Target, Users, TrendingUp, Handshake, BarChart, FileSignature } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Về HelloJob',
  description: 'Tìm hiểu về sứ mệnh, tầm nhìn, giá trị cốt lõi và đội ngũ tâm huyết của HelloJob trong việc kết nối nguồn nhân lực Việt Nam với thị trường Nhật Bản.',
};


const teamMembers = [
  {
    name: 'Trần Tuấn Anh',
    role: 'Founder & CEO',
    avatar: 'https://placehold.co/200x200.png',
    dataAiHint: 'ceo portrait',
  },
  {
    name: 'Lê Thị Bích',
    role: 'Head of Product',
    avatar: 'https://placehold.co/200x200.png',
    dataAiHint: 'product manager portrait',
  },
  {
    name: 'Nguyễn Văn Cường',
    role: 'CTO',
    avatar: 'https://placehold.co/200x200.png',
    dataAiHint: 'cto portrait',
  },
   {
    name: 'Phạm Thị Dung',
    role: 'Head of Marketing',
    avatar: 'https://placehold.co/200x200.png',
    dataAiHint: 'marketing head portrait',
  },
];

const values = [
    {
        icon: Users,
        title: "Lấy người dùng làm trung tâm",
        description: "Mọi sản phẩm, tính năng đều được xây dựng dựa trên nhu cầu và trải nghiệm của người lao động và đối tác tuyển dụng."
    },
    {
        icon: TrendingUp,
        title: "Tăng trưởng bền vững",
        description: "Chúng tôi không chỉ giúp người lao động tìm việc, mà còn xây dựng lộ trình phát triển sự nghiệp lâu dài và bền vững."
    },
    {
        icon: Handshake,
        title: "Đối tác tin cậy",
        description: "Xây dựng mối quan hệ hợp tác minh bạch, hiệu quả và cùng có lợi với các đối tác tuyển dụng và nhượng quyền."
    }
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Về HelloJob</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4 text-primary-foreground/80">
            Chúng tôi là cầu nối vững chắc giữa nguồn nhân lực chất lượng cao Việt Nam và các cơ hội việc làm tại thị trường Nhật Bản.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square">
              <Image
                src="https://placehold.co/600x600.png"
                alt="Đội ngũ HelloJob"
                fill
                className="object-cover rounded-lg shadow-xl"
                data-ai-hint="diverse team working"
              />
            </div>
            <div className="space-y-8">
              <div>
                <Target className="h-12 w-12 text-accent-orange mb-4" />
                <h2 className="text-3xl font-headline font-bold text-primary mb-2">Sứ mệnh của chúng tôi</h2>
                <p className="text-muted-foreground text-lg">
                  Sứ mệnh của HelloJob là định hình tư duy, nâng cao kỹ năng và xây dựng lộ trình sự nghiệp rõ ràng cho người lao động Việt Nam, đồng thời cung cấp giải pháp tuyển dụng hiệu quả, minh bạch cho các đối tác tuyển dụng Kỹ năng Đặc định (Tokutei Ginou) tại Nhật Bản.
                </p>
              </div>
              <div>
                <Lightbulb className="h-12 w-12 text-accent-green mb-4" />
                <h2 className="text-3xl font-headline font-bold text-primary mb-2">Tầm nhìn</h2>
                <p className="text-muted-foreground text-lg">
                  Trở thành nền tảng công nghệ hàng đầu tại Việt Nam trong lĩnh vực cung ứng và phát triển nguồn nhân lực, đặc biệt là cho thị trường lao động tay nghề cao tại Nhật Bản và các quốc gia phát triển.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
       <section className="py-20 md:py-28 bg-background">
         <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
                 <h2 className="text-3xl font-headline font-bold text-primary">Giá trị cốt lõi</h2>
                 <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">Những nguyên tắc định hướng mọi hành động và quyết định của chúng tôi.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {values.map(value => (
                    <Card key={value.title} className="p-8 shadow-lg hover:shadow-xl transition-shadow">
                         <value.icon className="h-16 w-16 text-primary mx-auto mb-4"/>
                         <h3 className="text-xl font-bold font-headline mb-2">{value.title}</h3>
                         <p className="text-muted-foreground">{value.description}</p>
                    </Card>
                ))}
            </div>
         </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold text-primary">Đội ngũ của chúng tôi</h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
              Những con người tâm huyết đứng sau thành công của HelloJob, luôn nỗ lực vì sự phát triển của bạn.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative h-32 w-32 md:h-40 md:w-40 mx-auto mb-4">
                   <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover shadow-lg"
                    data-ai-hint={member.dataAiHint}
                  />
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-primary font-semibold">{member.role}</p>
              </div>
            )))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent text-white py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-headline font-bold mb-4">Trở thành đối tác của HelloJob</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
                Bạn là một nhà tuyển dụng, một công ty phái cử hay một nhà đầu tư có tầm nhìn? Hãy liên hệ với chúng tôi để cùng khai thác tiềm năng của thị trường.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                    <Link href="/franchise">Tìm hiểu mô hình Nhượng quyền <FileSignature/></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20 hover:text-white">
                    <Link href="/employers">Dành cho Đối tác tuyển dụng <BarChart/></Link>
                </Button>
            </div>
        </div>
      </section>
    </>
  );
}
