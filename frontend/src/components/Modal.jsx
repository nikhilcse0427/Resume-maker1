import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { modalStyles as styles } from '../assets/dummystyle';

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionClick = () => {},
  isSubmitting = false, // New prop for submission loading state
}) => {
  if (!isOpen) return null;

  const handleActionClick = async () => {
    if (isSubmitting) return; // Prevent multiple clicks while submitting
    await onActionClick();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {!hideHeader && (
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>

            {showActionBtn && (
              <button
                className={`${styles.actionButton} flex items-center justify-center gap-2`}
                onClick={handleActionClick}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {actionBtnText || 'Processing...'}
                  </>
                ) : (
                  <>
                    {actionBtnIcon}
                    {actionBtnText}
                  </>
                )}
              </button>
            )}
          </div>
        )}

        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          disabled={isSubmitting}
        >
          <X size={20} />
        </button>

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;