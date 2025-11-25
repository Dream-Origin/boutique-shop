import "./ConfirmModal.css";

export default function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h3 className="confirm-title">Are you sure?</h3>
        <p className="confirm-message">{message}</p>

        <div className="confirm-buttons">
          <button className="confirm-btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-btn ok" onClick={onConfirm}>
            Yes, Clear
          </button>
        </div>
      </div>
    </div>
  );
}
