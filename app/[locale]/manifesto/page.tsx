import {
  ManifestoCta,
  ManifestoFeatures,
  ManifestoFooter,
  ManifestoHeader,
  ManifestoHero,
  ManifestoPricing,
} from "@/features/landing-cyberpunk";

export default function ManifestoPage() {
  return (
    <div className="bg-[var(--imp-void)] text-white">
      <ManifestoHeader />
      <ManifestoHero />
      <ManifestoFeatures />
      <ManifestoPricing />
      <ManifestoCta />
      <ManifestoFooter />
    </div>
  );
}
