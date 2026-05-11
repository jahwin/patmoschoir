import BlogContent from "../blog.$slug/components/BlogContent";
import PublicLayout from "@/components/layouts/public-layout";
import { Head, usePage } from "@inertiajs/react";
import NotFound from "../404";
import { SharedData } from '@/types/shared';

export default function PaymentTerms() {
  const { siteContent } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Payment Terms" />
      {
        siteContent && siteContent.payment_terms && siteContent.payment_terms.length > 10 ? (
          <PublicLayout title="Payment Terms" >
            <BlogContent content={siteContent.payment_terms} />
          </PublicLayout>
        ) : (
          <NotFound />
        )
      }
    </>
  );
}