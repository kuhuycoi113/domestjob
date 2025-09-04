
// export class Pager {
//     totalItems: number = 0;
//     currentPage: number;
//     pageSize: number;
//     totalPages: number;
//     startPage: number;
//     endPage: number;
//     startIndex: number;
//     endIndex: number;
//     pages: number[];
//     filter?: {
//     sort?: any;
//     asc?: any;
//     [key: string]: any;
//   };

//     constructor(totalItems: number=0, currentPage: number = 1, pageSize: number = 20, maxPages: number = 10) {
//         // calculate total pages
//         const totalPages = Math.ceil(totalItems / pageSize);

//         // ensure current page is valid
//         if (currentPage < 1) {
//             currentPage = 1;
//         } else if (currentPage > totalPages) {
//             currentPage = totalPages;
//         }

//         let startPage: number, endPage: number;
//         if (totalPages <= maxPages) {
//             // total pages less than max so show all pages
//             startPage = 1;
//             endPage = totalPages;
//         } else {
//             // total pages more than max so calculate start and end pages
//             const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
//             const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
//             if (currentPage <= maxPagesBeforeCurrentPage) {
//                 // current page near the start
//                 startPage = 1;
//                 endPage = maxPages;
//             } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
//                 // current page near the end
//                 startPage = totalPages - maxPages + 1;
//                 endPage = totalPages;
//             } else {
//                 // current page somewhere in the middle
//                 startPage = currentPage - maxPagesBeforeCurrentPage;
//                 endPage = currentPage + maxPagesAfterCurrentPage;
//             }
//         }

//         // calculate start and end item indexes
//         const startIndex = (currentPage - 1) * pageSize;
//         const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

//         // create an array of pages to ng-repeat in the pager control
//         const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

//         // set object properties
//         this.totalItems = totalItems;
//         this.currentPage = currentPage;
//         this.pageSize = pageSize;
//         this.totalPages = totalPages;
//         this.startPage = startPage;
//         this.endPage = endPage;
//         this.startIndex = startIndex;
//         this.endIndex = endIndex;
//         this.pages = pages;
//     }
// }
// import { IPager } from "@/types/pager";
export interface IPager {
  totalResult: number;
  currentPage: number;
  displayPerPage: number;
  filter?: {
    sort?: any;
    asc?: boolean;
    [key: string]: any;
  };
  // get totalPage() {
  //     return Math.ceil(this.totalResult / this.displayPerPage) ?? 0;
  // }
}
export class Pager implements IPager {
  totalResult: number = 0;
  currentPage: number = 1;
  displayPerPage: number = 20;
  filter?: {
    sort?: any;
    asc?: any;
    [key: string]: any;
  };
  get totalPage() {
    return Math.ceil(this.totalResult / this.displayPerPage) ?? 0;
  }
}
