import BaseModal from "../Modal/BaseModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LearnMoreModal({ open, onClose }: Props) {
  return (
    <BaseModal open={open} onClose={onClose} title="Learn More">
      <p className="mb-4">
        This platform helps you manage, monitor, and scale your workflow with
        ease.
      </p>

      <ul className="list-disc pl-5 space-y-2">
        <li>Fast and secure</li>
        <li>Modern UI experience</li>
        <li>Real-time data integration</li>
      </ul>
    </BaseModal>
  );
}
