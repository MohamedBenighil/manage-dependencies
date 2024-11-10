import { Info } from "lucide-react";
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
      <div className="alert flex gap-2">
        <Info className="text-orange-500" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;
