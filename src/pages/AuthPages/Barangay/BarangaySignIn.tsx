import PageMeta from "../../../components/common/PageMeta";
import AuthLayout from "../AuthPageLayout";
import SignInForm from "../../../components/auth/Barangay/SignInForm";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

export default function BarangaySignIn({ alertsRef }: Props) {
  return (
    <>
      <PageMeta
        title="Signin | X-Stream"
        description="Sign in to your X-Stream account to access the admin dashboard and manage your application settings."
      />
      <AuthLayout>
        <SignInForm alertsRef={alertsRef} />
      </AuthLayout>
    </>
  );
}
