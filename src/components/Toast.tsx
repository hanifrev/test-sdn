import React from "react";

type ToastProps = {
  message: string;
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div
      className="alert alert-success absolute max-w-[600px] z-30"
      style={{ left: "calc(50% - 600px / 2)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>User {message}</span>
    </div>
  );
};

export default Toast;
