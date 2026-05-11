import BlogContent from "../blog.$slug/components/BlogContent";
import PublicLayout from "@/components/layouts/public-layout";
import { Head, usePage } from "@inertiajs/react";
import NotFound from "../404";
import { SharedData } from '@/types/shared';

export default function PrivacyPolicy() {
  const { siteContent } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Privacy Policy" />
      {
        siteContent && siteContent.privacy_policy && siteContent.privacy_policy.length > 10 ? (
          <PublicLayout title="Privacy Policy" >
            <BlogContent content={siteContent.privacy_policy} />
          </PublicLayout>
        ) : (
          <NotFound />
        )
      }
    </>
  );
}