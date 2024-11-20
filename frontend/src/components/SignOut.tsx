import React from "react";

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

const SignOutModal: React.FC<SignOutModalProps> = ({
  isOpen,
  onClose,
  onSignOut,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center h-screen justify-center bg-black bg-opacity-10 backdrop-blur-md z-50">
      {/* Modal Content */}
      <div className="bg-opacity-90 rounded-lg px-6 py-8 w-80 text-center text-textPrimary shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Sign Out</h2>
        <p className="text-sm mb-6">
          Are you sure you want to sign out of your account?
        </p>
        <div className="flex justify-between">
          <button
            onClick={onSignOut}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition"
          >
            Yes, Sign Out
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;
