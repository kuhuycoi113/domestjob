import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       // Chỉ định các categoryID hợp lệ và chuyển đến route chung
  //       source: "/:newsCategoryID(tu-van-xuat-khau-lao-dong|tu-van-dac-dinh|tim-hieu-nhat-ban|tu-van-du-hoc|hoc-tieng-nhat)/:newsID.html",
  //       destination: "/news/:newsCategoryID/:newsID", // Route chung mà bạn muốn
  //     },
  //     {
  //       // Chỉ định các categoryID hợp lệ và chuyển đến route chung
  //       source: "/cam-nang/:newsCategoryID(tu-van-xuat-khau-lao-dong|tu-van-dac-dinh|tim-hieu-nhat-ban|tu-van-du-hoc|hoc-tieng-nhat)/page/:page/",
  //       destination: "/news/:newsCategoryID?page=:page", // Route chung mà bạn muốn
  //     },
  //     {
  //       // Chỉ định các categoryID hợp lệ và chuyển đến route chung
  //       source: "/cam-nang/page/:page/",
  //       destination: "/news/null?page=:page", // Route chung mà bạn muốn
  //     },
  //     {
  //       // Chỉ định các categoryID hợp lệ và chuyển đến route chung
  //       source: "/cam-nang/:newsCategoryID(tu-van-xuat-khau-lao-dong|tu-van-dac-dinh|tim-hieu-nhat-ban|tu-van-du-hoc|hoc-tieng-nhat)/",
  //       destination: "/news/:newsCategoryID", // Route chung mà bạn muốn
  //     },
  //     {
  //       // Chỉ định các categoryID hợp lệ và chuyển đến route chung
  //       source: "/cam-nang/",
  //       destination: "/news/null", // Route chung mà bạn muốn
  //     },
  //     {
  //       // Chỉ định các categoryID của việc làm hợp lệ và chuyển đến route chung
  //       source: "/:jobCategoryID(thuc-tap-sinh|dac-dinh|ky-su)/page/:page/",
  //       destination: "/jobs?jobCategoryID=:jobCategoryID&page=:page", // Route chung mà bạn muốn
  //     },
  //     {
  //       // Chỉ định các categoryID của việc làm hợp lệ và chuyển đến route chung
  //       source: "/:jobCategoryID(thuc-tap-sinh|dac-dinh|ky-su)/",
  //       destination: "/jobs?jobCategoryID=:jobCategoryID", // Route chung mà bạn muốn
  //     },
  //     {
  //       // Chỉ định các categoryID của việc làm hợp lệ và chuyển đến route chung
  //       source: "/:jobCategoryID(thuc-tap-sinh|dac-dinh|ky-su)/:jobChildrenCategoryID/page/:page/",
  //       destination: "/jobs?jobCategoryID=:jobCategoryID&childrenCategoryID=:jobChildrenCategoryID&page=:page", // Route chung mà bạn muốn
  //     },
  //     {
  //       // Chỉ định các categoryID của việc làm hợp lệ và chuyển đến route chung
  //       source: "/:jobCategoryID(thuc-tap-sinh|dac-dinh|ky-su)/:jobChildrenCategoryID/",
  //       destination: "/jobs?jobCategoryID=:jobCategoryID&childrenCategoryID=:jobChildrenCategoryID", // Route chung mà bạn muốn
  //     },
  //     {
  //       // Chỉ định các categoryID hợp lệ và chuyển đến route chung
  //       source: "/:jobCategoryID(thuc-tap-sinh|dac-dinh|ky-su)/:jobChildrenCategoryID/:jobID.html",
  //       destination: "/jobs/:jobID", // Route chung mà bạn muốn
  //     },
  //     {
  //       // Chỉ định các categoryID hợp lệ và chuyển đến route chung
  //       source: "/dieu-khoan-chinh-sach/",
  //       destination: "/dieu-khoan-chinh-sach.html", // Route chung mà bạn muốn
  //     },
  //     {
  //       // Chỉ định các categoryID hợp lệ và chuyển đến route chung
  //       source: "/co-che-giai-quyet-tranh-chap/",
  //       destination: "/co-che-giai-quyet-tranh-chap.html", // Route chung mà bạn muốn
  //     },
  //     {
  //       // Chỉ định các categoryID hợp lệ và chuyển đến route chung
  //       source: "/chinh-sach-bao-mat/",
  //       destination: "/chinh-sach-bao-mat.html", // Route chung mà bạn muốn
  //     },
  //     {
  //       // Chỉ định các categoryID hợp lệ và chuyển đến route chung
  //       source: "/gioi-thieu/",
  //       destination: "/gioi-thieu.html", // Route chung mà bạn muốn
  //     }
  //   ];
  // },
  /* config options here */
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.hellojob.jp",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "scontent-atl3-2.xx.fbcdn.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
