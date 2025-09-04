"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export default function FilterSidebar() {
  return (
    <div className="md:col-span-1 lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Bộ lọc</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Mức lương (triệu VND)</Label>
            <Slider defaultValue={[20, 50]} max={100} step={1} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>20tr</span>
              <span>100tr</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Loại hình công việc</Label>
            <div className="space-y-2">
              {["Toàn thời gian", "Bán thời gian", "Thực tập"].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={`type-${item}`} />
                  <Label htmlFor={`type-${item}`} className="font-normal">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Cấp bậc</Label>
            <div className="space-y-2">
              {["Thực tập sinh", "Nhân viên", "Chuyên viên", "Trưởng nhóm"].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={`level-${item}`} />
                  <Label htmlFor={`level-${item}`} className="font-normal">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full bg-primary text-white">Áp dụng</Button>
        </CardContent>
      </Card>
    </div>
  );
}
