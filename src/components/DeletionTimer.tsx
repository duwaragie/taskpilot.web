import React, { useEffect, useRef } from 'react';
import { useToast } from '../contexts/ToastContext';

interface DeletionTimerProps {
  taskId: number;
  taskTitle: string;
  onConfirmDelete: (taskId: number) => void;
  onAbortDelete: () => void;
  duration?: number;
}

const DeletionTimer: React.FC<DeletionTimerProps> = ({
  taskId,
  taskTitle,
  onConfirmDelete,
  onAbortDelete,
  duration = 5000
}) => {
  const { addToast, removeToast } = useToast();
  const toastIdRef = useRef<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const abortDeletion = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (toastIdRef.current) {
        removeToast(toastIdRef.current);
        toastIdRef.current = null;
      }
      onAbortDelete();
    };

    toastIdRef.current = addToast(
      `Deleting "${taskTitle}" in ${Math.ceil(duration / 1000)} seconds...`,
      'warning',
      0,
      {
        label: 'Undo',
        onClick: abortDeletion
      }
    );

    timerRef.current = window.setTimeout(() => {
      if (toastIdRef.current) {
        removeToast(toastIdRef.current);
        toastIdRef.current = null;
      }
      onConfirmDelete(taskId);
    }, duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (toastIdRef.current) {
        removeToast(toastIdRef.current);
      }
    };
  }, [taskId, taskTitle, onConfirmDelete, onAbortDelete, duration]);

  return null;
};

export default DeletionTimer;
