

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LifeBuoy, Search, ArrowRight, Video, FileText, Newspaper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { articles, HandbookArticle } from '@/lib/handbook-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cẩm nang HelloJob - Thông tin việc làm & cuộc sống tại Nhật',
  description: 'Tất cả thông tin bạn cần về Kỹ năng đặc định (Tokutei Ginou), kinh nghiệm phỏng vấn, thủ tục visa, và cuộc sống tại Nhật Bản được cập nhật liên tục.',
};


const ArticleCard = ({ article, className }: { article: HandbookArticle, className?: string }) => (
  <Link href={`/handbook/${article.slug}`} className={cn("group block", className)}>
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 rounded-xl">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={article.dataAiHint}
          />
           {article.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Video className="h-12 w-12 text-white/80" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-5 flex-grow flex flex-col">
        <Badge className={cn("mb-3 w-fit", 
            article.category === 'Kỹ năng đặc định' ? 'bg-accent-blue/20 text-accent-blue border-accent-blue/30' : 
            'bg-accent-green/20 text-accent-green border-accent-green/30'
        )}>{article.category}</Badge>
        <CardTitle className="font-headline text-lg mb-3 flex-grow group-hover:text-primary transition-colors leading-tight">{article.title}</CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-3">{article.excerpt}</p>
      </CardContent>
    </Card>
  </Link>
);

const PostCard = ({ article }: { article: HandbookArticle }) => (
  <Link href={`/handbook/${article.slug}`} className="group block">
    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl">
       <CardContent className="p-5">
         <Badge className={cn("mb-3 w-fit", 
            article.category === 'Kinh nghiệm phỏng vấn' ? 'bg-accent-orange/20 text-accent-orange border-accent-orange/30' : 
            'bg-accent-red/20 text-accent-red border-accent-red/30'
        )}>{article.category}</Badge>
         <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{article.title}</p>
         <p className="text-xs text-muted-foreground mt-2">{article.readTime} đọc</p>
      </CardContent>
    </Card>
  </Link>
)

const VideoCard = ({ article }: { article: HandbookArticle }) => (
  <Link href={`/handbook/${article.slug}`} className="group block">
      <Card className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 aspect-[9/16]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={article.dataAiHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
             <Video className="h-10 w-10 mb-4 text-white/80" />
             <h4 className="font-headline text-lg font-bold leading-tight line-clamp-3">{article.title}</h4>
             <p className="text-xs mt-2 opacity-80">{article.category}</p>
          </div>
      </Card>
  </Link>
);


export default function HandbookPage() {

  const featuredArticle = articles.find(a => a.slug === 'tokutei-ginou-la-gi')!;
  const mainArticles = articles.filter(a => a.type === 'article' && a.slug !== featuredArticle.slug);
  const videos = articles.filter(a => a.type === 'video');
  const posts = articles.filter(a => a.type === 'post');


  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <LifeBuoy className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent">
            Cẩm nang HelloJob
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto whitespace-nowrap">
            Tất cả thông tin bạn cần biết về thị trường lao động, kỹ năng và cuộc sống tại Nhật Bản.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="relative">
             <Input placeholder="Tìm kiếm bài viết (VD: Tokutei, chi phí...)" className="pl-12 h-12 text-lg rounded-full shadow-lg"/>
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <main className="lg:col-span-8 space-y-16">
                {/* Featured Article */}
                <section>
                    <Link href={`/handbook/${featuredArticle.slug}`} className="group">
                        <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl">
                            <div className="grid md:grid-cols-2">
                                <div className="relative min-h-[300px] md:min-h-full">
                                    <Image
                                        src={featuredArticle.image}
                                        alt={featuredArticle.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        data-ai-hint={featuredArticle.dataAiHint}
                                    />
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <Badge className="mb-4 w-fit bg-accent-orange text-white">{featuredArticle.category}</Badge>
                                    <CardTitle className="font-headline text-2xl xl:text-3xl mb-4 group-hover:text-primary transition-colors">{featuredArticle.title}</CardTitle>
                                    <CardDescription className="text-base mb-6">{featuredArticle.excerpt}</CardDescription>
                                    <div className="flex items-center gap-3 font-bold text-primary">
                                        <span>Đọc bài viết</span>
                                        <ArrowRight className="transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </section>
                
                 {/* Latest Articles */}
                <section>
                    <h2 className="text-3xl font-headline font-bold mb-6 flex items-center text-foreground">
                        <FileText className="mr-3 text-primary"/> Bài viết mới
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {mainArticles.map((article) => (
                           <ArticleCard key={article.slug} article={article}/>
                       ))}
                    </div>
                </section>
            </main>
            
            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-16">
                {/* Short Videos */}
                <section>
                    <h2 className="text-3xl font-headline font-bold mb-6 flex items-center text-foreground">
                        <Video className="mr-3 text-primary"/> Video ngắn
                    </h2>
                     <div className="grid grid-cols-2 gap-4">
                       {videos.map((video) => (
                           <VideoCard key={video.slug} article={video} />
                       ))}
                    </div>
                </section>
                
                {/* Short Posts */}
                <section>
                    <h2 className="text-3xl font-headline font-bold mb-6 flex items-center text-foreground">
                        <Newspaper className="mr-3 text-primary"/> Tin tức & Bài đăng
                    </h2>
                    <div className="space-y-4">
                       {posts.map((post) => (
                           <PostCard key={post.slug} article={post} />
                       ))}
                    </div>
                </section>
            </aside>
        </div>
      </div>
    </div>
  );
}
