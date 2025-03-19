import { useEffect, useRef } from "react";
import useAddNotification from "./useAddNotification";

const useApiLoadingTime = ({
  isLoading,
  isSucceeded,
  message,
  erorr,
  notificationDismissTime = 30000,
}: {
  isLoading: boolean;
  isSucceeded: boolean;
  message?: string;
  erorr: any;
  notificationDismissTime?: number;
}) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const { showInfoNotification } = useAddNotification();
  useEffect(() => {
    if (timer.current) return;
    if (isLoading) {
      timer.current = setTimeout(() => {
        showInfoNotification(
          message ?? "Big Loading Time",
          notificationDismissTime
        );
      }, 3000);
    }
  }, [isLoading, message, notificationDismissTime, showInfoNotification]);

  useEffect(() => {
    if (isSucceeded && timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, [isSucceeded]);

  useEffect(() => {
    if (erorr && timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, [erorr]);

  return {};
};

export default useApiLoadingTime;
