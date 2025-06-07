import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <p className="text-xl text-gray-700 mt-4">صفحه‌ای که دنبالش بودی پیدا نشد!</p>
            <Link
                to="/"
                className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
            >
                بازگشت به خانه
            </Link>
        </div>
    );
}

export default NotFoundPage;
