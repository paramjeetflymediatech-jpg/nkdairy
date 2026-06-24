import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { getRawSeoMetadata } from "@/lib/seo";
import React from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NK Dairy Equipments",
  description: "World-class industrial manufacturing for next-generation dairy plants.",
};

function parseHeadScripts(html: string | undefined | null) {
  if (!html) return null;
  
  const linkRegex = /<link\s+([^>]+)\/?>/gi;
  const scriptRegex = /<script\s*([^>]*)>([\s\S]*?)<\/script>/gi;
  const metaRegex = /<meta\s+([^>]+)\/?>/gi;
  
  const elements: React.ReactNode[] = [];
  let match;
  let keyIndex = 0;
  
  const parseAttrs = (attrsStr: string) => {
    const attrs: Record<string, string> = {};
    const attrRegex = /(\w+)=["']([^"']*)["']/g;
    let m;
    while ((m = attrRegex.exec(attrsStr)) !== null) {
      attrs[m[1]] = m[2];
    }
    return attrs;
  };

  // Parse Links
  while ((match = linkRegex.exec(html)) !== null) {
    const attrs = parseAttrs(match[1]);
    elements.push(<link key={`seo-link-${keyIndex++}`} {...attrs} />);
  }

  // Parse Metas
  while ((match = metaRegex.exec(html)) !== null) {
    const attrs = parseAttrs(match[1]);
    elements.push(<meta key={`seo-meta-${keyIndex++}`} {...attrs} />);
  }

  // Parse Scripts
  while ((match = scriptRegex.exec(html)) !== null) {
    const attrs = parseAttrs(match[1]);
    const content = match[2];
    if (attrs.src) {
      elements.push(<script key={`seo-script-${keyIndex++}`} {...attrs} />);
    } else {
      elements.push(
        <script 
          key={`seo-script-${keyIndex++}`} 
          {...attrs} 
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      );
    }
  }

  return elements;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const seo = await getRawSeoMetadata(pathname);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {parseHeadScripts(seo?.headScripts)}
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
        {seo?.footerScripts && (
          <div dangerouslySetInnerHTML={{ __html: seo.footerScripts }} style={{ display: 'none' }} />
        )}
      </body>
    </html>
  );
}
