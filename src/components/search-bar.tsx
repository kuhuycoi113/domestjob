
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Search, ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { industriesByJobType, type Industry } from '@/lib/industry-data';
import { VISA_DETAILS } from '@/lib/visas';
import  WORKLOCATION  from "@/lib/jp_provinces.json"


export const SearchBar = () => {
  const router = useRouter();
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [availableIndustries, setAvailableIndustries] = useState<Industry[]>([]);
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState<any>(null);


  const finalSearchTerm = searchQuery || selectedIndustry;

  useEffect(() => {
    let industries: Industry[] = [];
    if (!selectedJobType) {
      // Collect all industries from all types and remove duplicates
      const allIndustries = Object.values(industriesByJobType).flat();
      const uniqueIndustries = Array.from(
        new Map(allIndustries.map((item) => [item['slug'], item])).values()
      );
      industries = uniqueIndustries;
    } else {
      let jobTypeKey: keyof typeof industriesByJobType | 'Default' = 'Default';
      if (selectedJobType.includes('Thực tập sinh'))
        jobTypeKey = 'Thực tập sinh';
      else if (selectedJobType.includes('Đặc định'))
        jobTypeKey = 'Kỹ năng đặc định';
      else if (selectedJobType.includes('Kỹ sư, tri thức'))
        jobTypeKey = 'Kỹ sư, tri thức';
      industries = industriesByJobType[jobTypeKey];
    }

    setAvailableIndustries(industries);
    setSelectedIndustry('');
    setSearchQuery('');
  }, [selectedJobType]);

  const handleSearchClick = () => {
    const queryParams = new URLSearchParams();

    if (selectedVisa) {
      queryParams.set("jobCategoryID", selectedVisa.parent);
      queryParams.set("childrenCategoryID", selectedVisa.nameAscii);
      if (selectedVisa?.languageLevel) {
        queryParams.set("languageLevel", selectedVisa.languageLevel.join(";"));
      }

    }
    if (finalSearchTerm) queryParams.set("q", finalSearchTerm);
    if (selectedLocation) queryParams.set("location", selectedLocation);

    router.push(`/tim-kiem?${queryParams.toString()}`);
  };

  const getFilteredIndustries = () => {
    if (!searchQuery) return availableIndustries;
    const lowercasedQuery = searchQuery.toLowerCase();
    return availableIndustries.filter(
      (industry) =>
        industry.name.toLowerCase().includes(lowercasedQuery) ||
        industry.keywords.some((keyword) =>
          keyword.toLowerCase().includes(lowercasedQuery)
        )
    );
  };
  const getVisaId = (visa: any) => (visa.languageLevel ? `${visa.nameAscii}__${visa.languageLevel}` : visa.nameAscii);


  return (
    <Card className="max-w-6xl mx-auto shadow-2xl">
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4 space-y-2">
            <Label htmlFor="search-type" className="text-foreground">
              Loại hình, kỹ năng
            </Label>
            <Select
              onValueChange={(value) => {
                const visaObj = VISA_DETAILS.find((v) => getVisaId(v) === value);
                if (visaObj) {
                  setSelectedJobType(getVisaId(visaObj)); // id duy nhất để select UI hoạt động
                  setSelectedVisa(visaObj); // lưu object đầy đủ để build query
                }
              }}
              value={selectedJobType}
            >
              <SelectTrigger id="search-type">
                <SelectValue placeholder="Chọn loại hình" />
              </SelectTrigger>
              <SelectContent>
                {VISA_DETAILS.map((item, index) => (
                  <SelectItem key={index} value={getVisaId(item)}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-3 space-y-2">
            <Label htmlFor="search-industry" className="text-foreground">
              Ngành nghề
            </Label>
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={comboboxOpen} className="w-full justify-between h-10 font-normal text-sm">
                  <span className="truncate">{finalSearchTerm || "Tất cả ngành nghề"}</span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command shouldFilter={false}>
                  <CommandInput placeholder="Tìm ngành nghề..." value={searchQuery} onValueChange={setSearchQuery} />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy.</CommandEmpty>
                    <CommandGroup>
                      {getFilteredIndustries().map((industry) => (
                        <CommandItem
                          key={industry.slug}
                          value={industry.name}
                          onSelect={(currentValue) => {
                            setSelectedIndustry(currentValue === selectedIndustry ? "" : industry.name);
                            setSearchQuery("");
                            setComboboxOpen(false);
                          }}
                        >
                          <Check className={cn("mr-2 h-4 w-4", selectedIndustry === industry.name ? "opacity-100" : "opacity-0")} />
                          {industry.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="md:col-span-3 space-y-2">
            <Label htmlFor="search-location" className="text-foreground">
              Địa điểm, khu vực
            </Label>
            <Select onValueChange={setSelectedLocation}>
              <SelectTrigger id="search-location">
                <SelectValue placeholder="Toàn quốc Nhật Bản" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectGroup>
                  <SelectLabel>Vùng</SelectLabel>
                  {japanLocations.regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectGroup> */}
                <SelectGroup>
                  <SelectLabel>Tỉnh/Thành phố</SelectLabel>
                  {WORKLOCATION.filter((item) => item.groupCode === "JP").map((item, index) => (
                    <SelectItem key={index} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white text-lg" onClick={handleSearchClick}>
              <Search className="mr-2 h-5 w-5" /> Tìm kiếm
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
