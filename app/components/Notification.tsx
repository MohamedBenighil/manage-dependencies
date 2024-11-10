import React, { useEffect } from "react";
interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification = ({ message, onClose }: NotificationProps) => {
  useEffect(
    () => {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      //return () => clearTimeout(timer);
    },
    [
      /*onclose*/
    ]
  );
  return (
    <div className="toast toast-bottom toast-right">
      <div className="alert">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;
