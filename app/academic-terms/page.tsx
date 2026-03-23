"use client";

import { CategoryList } from "@/components/ui/category-list";
import { BookOpen, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const terms = [
  {
    id: "term-iv",
    title: "Term IV",
    icon: <ArrowRight className="w-8 h-8" />,
    featured: true,
  },
  {
    id: "term-v",
    title: "Term V",
    icon: <ArrowRight className="w-8 h-8" />,
  },
  {
    id: "term-vi",
    title: "Term VI",
    icon: <ArrowRight className="w-8 h-8" />,
  },
];

export default function AcademicTermsPage() {
  const router = useRouter();

  const categories = terms.map((t) => ({
    ...t,
    onClick: () => router.push(`/academic-terms/${t.id}`),
  }));

  return (
    <div className="min-h-screen" style={{ background: "#F5F4EF" }}>
      {/* Nav back link */}
      <div className="max-w-4xl mx-auto px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#767676] hover:text-[#0C0C0C] no-underline transition-colors duration-200"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          <ArrowLeft size={14} />
          Back to KT Wiki
        </Link>
      </div>

      <CategoryList
        title="Academic Terms"
        subtitle="Term-wise split of elective KT, curated by Alumni Feedback"
        categories={categories}
        headerIcon={<BookOpen className="w-8 h-8" />}
        className="bg-transparent"
      />
    </div>
  );
}
