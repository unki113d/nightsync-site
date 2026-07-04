import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
import { WorkShowcase } from "@/components/work-showcase";
import { siteContent } from "@/content/site";
import { getPortfolioGames, getStudioMetrics } from "@/lib/portfolio";

export default async function Home() {
  const [games, studioMetrics] = await Promise.all([
    getPortfolioGames(),
    getStudioMetrics(),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteContent.name,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/night-sync-cat.svg`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navigation />
      <Hero />
      <WorkShowcase games={games} studioMetrics={studioMetrics} />
      <ContactSection />
    </main>
  );
}
