import PageMeta from "../../../components/common/PageMeta";
import AuthLayout from "../AuthPageLayout";
import VerifySuccess from "../../../components/auth/Administrator/VerifySuccess";

export default function VerifySuccessPage() {
  return (
    <>
      <PageMeta
        title="Email Verified | X-Stream"
        description="Your email has been successfully verified."
      />
      <AuthLayout>
        <VerifySuccess />
      </AuthLayout>
    </>
  );
}
