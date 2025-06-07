import React from 'react';

function FullLoader() {
    return (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-13 h-13 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 text-lg font-medium animate-pulse">در حال بارگیری...</p>
            </div>
        </div>
    );
}

export default FullLoader;
