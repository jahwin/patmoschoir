import BlogContent from "../blog.$slug/components/BlogContent";
import PublicLayout from "@/components/layouts/public-layout";
import { Head, usePage } from "@inertiajs/react";
import NotFound from "../404";
import { SharedData } from '@/types/shared';

export default function PaymentTerms() {
  const { siteContent } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Terms and Conditions" />
      {
        siteContent && siteContent.terms_and_conditions && siteContent.terms_and_conditions.length > 10 ? (
          <PublicLayout title="Terms and Conditions" >
            <BlogContent content={siteContent.terms_and_conditions} />
          </PublicLayout>
        ) : (
          <NotFound />
        )
      }
    </>
  );
}