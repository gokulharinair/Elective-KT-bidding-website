import Link from "next/link";
import Image from "next/image";

// Browser frame wrapper
function BrowserFrame({ src, alt, objectTop = "0%" }: { src: string; alt: string; objectTop?: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-[#0C0C0C]/12 shadow-[0_8px_32px_rgba(12,12,12,0.1),0_2px_8px_rgba(12,12,12,0.06)]">
      {/* Browser chrome */}
      <div className="bg-[#E8E7E2] border-b border-[#0C0C0C]/10 px-3 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0C0C0C]/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#0C0C0C]/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#0C0C0C]/20" />
        </div>
        <div className="flex-1 bg-[#F5F4EF]/70 rounded-md px-3 py-1 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-[#0C0C0C]/20 flex-shrink-0" />
          <span className="text-[10px] text-[#0C0C0C]/40 font-medium tracking-wide">ktwiki.vercel.app</span>
        </div>
      </div>
      {/* Screenshot */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          style={{ objectPosition: `center ${objectTop}` }}
          unoptimized
        />
      </div>
    </div>
  );
}

// Step component
function Step({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  imageTop,
  reverse,
}: {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageTop?: string;
  reverse?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
      {/* Text */}
      <div className={`flex flex-col gap-4 ${reverse ? "md:order-2" : ""}`}>
        <div className="flex items-center gap-3">
          <span
            className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#D9622B]"
          >
            Step {number}
          </span>
          <div className="flex-1 h-px bg-[#D9622B]/20" />
        </div>
        <h3
          className="text-2xl md:text-3xl text-[#0C0C0C] leading-tight"
          style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.025em" }}
        >
          {title}
        </h3>
        <p className="text-[15px] text-[#767676] leading-relaxed">
          {description}
        </p>
      </div>
      {/* Image */}
      <div className={reverse ? "md:order-1" : ""}>
        <BrowserFrame src={imageSrc} alt={imageAlt} objectTop={imageTop} />
      </div>
    </div>
  );
}

// Page
export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#F5F4EF]">

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b border-[#0C0C0C]/8 backdrop-blur-md"
        style={{ background: "rgba(245,244,239,0.88)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-semibold text-[#0C0C0C] no-underline"
            style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.02em" }}
          >
            ← KT Wiki
          </Link>
          <Link
            href="/feedback"
            className="text-sm bg-[#D9622B] text-white font-medium px-4 py-2 rounded no-underline"
            style={{ transition: "background 0.15s" }}
          >
            Add Course Feedback
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <span
          className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#D9622B] mb-4"
        >
          Guide
        </span>
        <h1
          className="text-5xl md:text-6xl text-[#0C0C0C] leading-[1.05] mb-5"
          style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.035em" }}
        >
          How KT Wiki Works
        </h1>
        <p className="text-lg text-[#767676] leading-relaxed max-w-2xl mx-auto">
          KT Wiki is a peer-to-peer knowledge base for IIM Lucknow MBA students.
          Whether you&apos;re sharing your elective experience or researching before bidding,
          here&apos;s everything you need to know.
        </p>
      </header>

      {/* Divider line */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#0C0C0C]/10" />
      </div>

      {/* Section 1: Feedback Giver */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        {/* Section header */}
        <div className="mb-12 flex items-start gap-6">
          <div
            className="text-[80px] leading-none text-[#0C0C0C]/6 select-none"
            style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.04em" }}
          >
            01
          </div>
          <div className="pt-3">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#D9622B] mb-2">
              For Feedback Givers
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0C0C0C] leading-tight"
              style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.03em" }}
            >
              Share your elective experience
            </h2>
            <p className="mt-2 text-[15px] text-[#767676] max-w-lg">
              Help your batchmates bid smarter. Takes 3 minutes. Lives on forever.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-16">
          <Step
            number="1"
            title={`Click "Add Course Feedback"`}
            description={`Find the terracotta "Add Course Feedback" button in the navigation bar or the hero section on the home page. You can submit feedback for any elective you've attended — across any term.`}
            imageSrc="/how-it-works/home.png"
            imageAlt="KT Wiki home page with Add Course Feedback button"
            imageTop="0%"
          />
          <Step
            number="2"
            title="Browse and select your elective"
            description="Search through all 90 electives across 12 areas. You can filter by area or scroll the full list. Select the course you took — the area and term are pre-filled automatically."
            imageSrc="/how-it-works/feedback-step1.png"
            imageAlt="Course browser showing all electives"
            imageTop="0%"
            reverse
          />
          <Step
            number="3"
            title="Fill in the form and submit"
            description="Rate the course content (1–5), share written feedback on the course and your key learning, note the bidding demand and points you used, and give a final recommendation. Hit submit — it's live instantly."
            imageSrc="/how-it-works/feedback-step2.png"
            imageAlt="Feedback form with ratings and text sections"
            imageTop="0%"
          />
        </div>

        {/* Giver CTA */}
        <div className="mt-14 pl-0 md:pl-0">
          <Link
            href="/feedback"
            className="inline-flex items-center gap-2 bg-[#D9622B] text-white text-sm font-medium px-6 py-3 rounded no-underline group"
            style={{ transition: "background 0.15s" }}
          >
            Add Your Feedback
            <span className="group-hover:translate-x-0.5" style={{ transition: "transform 0.15s" }}>→</span>
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#0C0C0C]/10" />
      </div>

      {/* Section 2: Feedback Taker */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        {/* Section header */}
        <div className="mb-12 flex items-start gap-6">
          <div
            className="text-[80px] leading-none text-[#0C0C0C]/6 select-none"
            style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.04em" }}
          >
            02
          </div>
          <div className="pt-3">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#D9622B] mb-2">
              For Feedback Takers
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0C0C0C] leading-tight"
              style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.03em" }}
            >
              Research before you bid
            </h2>
            <p className="mt-2 text-[15px] text-[#767676] max-w-lg">
              Stop guessing. Use real peer data to allocate your bidding points wisely.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-16">
          <Step
            number="1"
            title="Open the Knowledge Base"
            description='From the home page, scroll down to the Knowledge Base grid — 12 area tiles, each linking to all courses in that domain. Or use the "Elective Areas" dropdown in the nav to jump directly.'
            imageSrc="/how-it-works/home.png"
            imageAlt="KT Wiki home page Knowledge Base grid"
            imageTop="60%"
          />
          <Step
            number="2"
            title="Browse courses by area and term"
            description="Each area page lists all courses grouped by Term IV, V, and VI. You can see high-level stats — average rating and % recommended — right on the course card, before clicking in."
            imageSrc="/how-it-works/area-page.png"
            imageAlt="Finance & Accounting area page with courses grouped by term"
            imageTop="0%"
            reverse
          />
          <Step
            number="3"
            title="Read peer stats and reviews"
            description="Click any course to see the full picture — overall rating, effort level, bidding demand, typical points used, and the recommendation percentage. Plus read every written review to understand what makes the course tick."
            imageSrc="/how-it-works/course-with-feedback.png"
            imageAlt="Course detail page with stats summary and written reviews"
            imageTop="0%"
          />
        </div>

        {/* Taker CTA */}
        <div className="mt-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#0C0C0C] text-[#F5F4EF] text-sm font-medium px-6 py-3 rounded no-underline group"
            style={{ transition: "background 0.15s" }}
          >
            Explore Courses
            <span className="group-hover:translate-x-0.5" style={{ transition: "transform 0.15s" }}>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#0C0C0C]/10 mt-4">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <span
            className="text-sm font-medium text-[#0C0C0C]"
            style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "-0.01em" }}
          >
            KT Wiki
          </span>
          <span className="text-xs text-[#767676]">
            IIM Lucknow PGP Elective Knowledge Base · Built by students, for students.
          </span>
        </div>
      </footer>
    </div>
  );
}
