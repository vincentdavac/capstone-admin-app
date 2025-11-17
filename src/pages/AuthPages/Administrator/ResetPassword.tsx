import PageMeta from "../../../components/common/PageMeta";
import AuthLayout from "../AuthPageLayout";
import ResetPassword from "../../../components/auth/Administrator/ResetPassword";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

export default function ResetPasswordPage({ alertsRef }: Props) {
  return (
    <>
      <PageMeta
        title="Reset Password | X-Stream"
        description="Enter your new password to regain access to your X-Stream admin account."
      />
      <AuthLayout>
        <ResetPassword alertsRef={alertsRef} />
      </AuthLayout>
    </>
  );
}
