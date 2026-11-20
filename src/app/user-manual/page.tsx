import type { Metadata } from "next";
import { Vazirmatn, Noto_Sans_Arabic } from "next/font/google";
import UserManualContent from "@/components/user-manual-content";
import { manualLanguages, type ManualLanguage } from "@/data/user-manual-translations";

const persian = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-persian",
  display: "swap",
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "User Manual",
  description: "How to work with me effectively. Communication preferences, work style, and expectations.",
  alternates: {
    canonical: "/user-manual",
    languages: Object.fromEntries(
      manualLanguages.map((item) => [
        item.code,
        item.code === "en" ? "/user-manual" : `/user-manual?lang=${item.code}`,
      ]),
    ),
  },
};

export default async function UserManualPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const { lang } = await searchParams;
  const requested = Array.isArray(lang) ? lang[0] : lang;
  const initialLanguage = manualLanguages.find((item) => item.code === requested?.toLowerCase())?.code ?? "en";

  return (
    <main className={`${persian.variable} ${arabic.variable} min-h-dvh pb-12`}>
      <UserManualContent initialLanguage={initialLanguage as ManualLanguage} />
    </main>
  );
}
