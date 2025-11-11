export default function ActionButtons({ onReset }) {
    return (
        <div className="mt-4 flex justify-center">
        <button
            onClick={onReset}
            className="bg-gray-300 hover:bg-gray-400 rounded-full px-6 py-2 font-semibold"
        >
            リセット
        </button>
        </div>
    );
}