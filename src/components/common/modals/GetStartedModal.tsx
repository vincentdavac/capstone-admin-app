import BaseModal from "../Modal/BaseModal";
import { Button } from "../../../common/Loader/Button";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function GetStartedModal({ open, onClose }: Props) {
  return (
    <BaseModal open={open} onClose={onClose} title="Get Started">
      <p className="mb-6">
        Start your journey by creating an account and exploring the platform’s
        core features.
      </p>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button>Continue</Button>
      </div>
    </BaseModal>
  );
}
