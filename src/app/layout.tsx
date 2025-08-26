import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header"; // 공용 헤더 추가

/**
 * 앱 공통 레이아웃
 * - 상단 Header (로고 버튼 → "/" 이동)
 * - 중앙 컨테이너로 children 감싸기
 */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Next.js + TypeScript Todo",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        {/* 나눔스퀘어 적용 */}
        <link
          href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}