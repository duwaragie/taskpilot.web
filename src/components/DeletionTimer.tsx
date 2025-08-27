import React, { useEffect, useRef } from 'react';
import { useToast } from '../contexts/ToastContext';

interface DeletionTimerProps {
  taskId: number;
  taskTitle: string;
  onConfirmDelete: (taskId: number) => void;
  onAbortDelete: () => void;
  duration?: number; // in milliseconds, default 5000 (5 seconds)
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

    // Show single toast with abort action
    toastIdRef.current = addToast(
      `Deleting "${taskTitle}" in ${Math.ceil(duration / 1000)} seconds...`,
      'warning',
      0, // Don't auto-remove, we'll handle it manually
      {
        label: 'Undo',
        onClick: abortDeletion
      }
    );

    // Auto-delete after duration
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

  return null; // This component doesn't render anything visible
};

export default DeletionTimer;
