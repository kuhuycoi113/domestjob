import { IPager } from "@/types/pager";

export class Pager implements IPager {
  totalResult: number = 0;
  currentPage: number = 1;
  displayPerPage: number = 40;
  filter?: {
    sort?: any;
    asc?: any;
    [key: string]: any;
  };
  get totalPage() {
    return Math.ceil(this.totalResult / this.displayPerPage) ?? 0;
  }
}
