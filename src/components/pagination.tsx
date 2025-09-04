"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pager } from "@/lib/pager";

interface PaginationProps {
  pager: Pager;
  basePath: string;
  searchParams: Record<string, string | string[] | undefined>;
}

export function Pagination({ pager, basePath, searchParams }: PaginationProps) {
  const totalPages = pager.totalPage;

  if (totalPages <= 1) return null;

  const buildLink = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== undefined) {
        params.set(key, String(value));
      }
    });

    params.set("page", page.toString());
    return `${basePath}?${params.toString()}`;
  };

  // 👉 generate pages (có thể cải tiến thành hiển thị 1..5..last sau này)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {/* Prev */}
      <Button asChild variant="outline" size="sm" disabled={pager.currentPage === 1}>
        <Link href={buildLink(pager.currentPage - 1)}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Link>
      </Button>

      {/* Pages */}
      {pages.map((page) => (
        <Button key={page} asChild variant={pager.currentPage === page ? "default" : "outline"} size="sm">
          <Link href={buildLink(page)}>{page}</Link>
        </Button>
      ))}

      {/* Next */}
      <Button asChild variant="outline" size="sm" disabled={pager.currentPage === totalPages}>
        <Link href={buildLink(pager.currentPage + 1)}>
          <span className="sr-only">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
