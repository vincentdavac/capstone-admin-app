import PageMeta from "../../../components/common/PageMeta";
import AuthLayout from "../AuthPageLayout";
import ForgotPassword from "../../../components/auth/Barangay/ForgotPassword";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

export default function BarangayForgotPassword({ alertsRef }: Props) {
  return (
    <>
      <PageMeta
        title="Forgot Password | X-Stream"
        description="Reset your X-Stream admin password by requesting a reset link."
      />
      <AuthLayout>
        <ForgotPassword alertsRef={alertsRef} />
      </AuthLayout>
    </>
  );
}
