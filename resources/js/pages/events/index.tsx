import { Head } from "@inertiajs/react";
import PublicLayout from "@/components/layouts/public-layout";
import HomeEventsSection from "@/pages/index/components/HomeEventsSection";

export default function Events() {
  return (
    <>
      <Head title="Events & Outreach" />
      <PublicLayout
        title="Events & Outreach"
        subtitle="Concerts, crusades, hospitals, and wherever God calls"
        description="Join us at our upcoming concerts or follow our outreach ministry as we bring music and hope to communities across Rwanda."
      >
        <HomeEventsSection />
      </PublicLayout>
    </>
  );
}
