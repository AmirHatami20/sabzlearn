import React, { useEffect, useState } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import appRoutes from './routes/appRoutes';
import ScrollToTop from './components/ScrollToTop.jsx';

function AppRoutes() {
    return useRoutes(appRoutes);
}

function App() {
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
        if (isFirefox) setShowWarning(true);
    }, []);

    return (
        <BrowserRouter>
            <ScrollToTop />
            {showWarning && (
                <div className="bg-yellow-300 text-black text-center py-3 font-bold">
                    مرورگر شما (Firefox) ممکن است با برخی امکانات سایت ناسازگار باشد. لطفاً از مرورگر Chrome استفاده کنید.
                </div>
            )}
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
