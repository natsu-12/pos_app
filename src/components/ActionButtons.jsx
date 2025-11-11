export default function ActionButtons({ onReset }) {
    return (
        <div className="action-buttons">
            <button
                onClick={onReset}
                className="action-reset-button"
            >
                リセット
            </button>
        </div>
    );
}