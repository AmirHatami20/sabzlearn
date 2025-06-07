import React from 'react';

function Loader() {
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="w-13 h-13 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg font-medium animate-pulse">در حال بارگیری...</p>
        </div>
    );
}

export default Loader;
