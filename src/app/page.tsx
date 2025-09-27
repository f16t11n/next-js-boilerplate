import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Vesper Production Boilerplate</h1>
        <p className="text-center sm:text-left mb-2">We introduce:</p>
        <ul className="list-disc pl-6 text-left mb-6">
          <li>Modern Next.js 15+ architecture</li>
          <li>Config-driven environment system</li>
          <li>Centralized error handling & custom error pages</li>
          <li>Confluence-style documentation UI</li>
          <li>Production-ready security & best practices</li>
        </ul>
        <a
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base h-12 px-5 w-full sm:w-auto md:w-[158px]"
          href="/docs"
        >
          Go to Docs
        </a>
      </main>
    </div>
  );
}
