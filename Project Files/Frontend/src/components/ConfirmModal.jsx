import { FiAlertTriangle, FiX } from 'react-icons/fi';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-modal-overlay" onClick={onCancel}>
            <div className="confirm-modal" onClick={e => e.stopPropagation()}>
                <button className="confirm-modal-close" onClick={onCancel}><FiX /></button>
                <div className="confirm-modal-icon">
                    <FiAlertTriangle />
                </div>
                <h3 className="confirm-modal-title">{title || 'Confirm Action'}</h3>
                <p className="confirm-modal-message">{message || 'Are you sure you want to proceed?'}</p>
                <div className="confirm-modal-actions">
                    <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
                    <button className="btn btn-danger" onClick={onConfirm}>Yes, Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
