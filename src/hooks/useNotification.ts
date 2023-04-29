import React from 'react';
import { toast, ToastOptions } from 'react-toastify';

const useNotification = () => {
  const notify = ({
    message,
    options,
  }: {
    message: string;
    options?: ToastOptions;
  }) => {
    toast(message || 'Something is wrong', {
      type: 'success',
      ...options,
    });
  };
  return { notify };
};

export default useNotification;
