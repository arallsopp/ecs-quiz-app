import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

function UpdatePrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered:', r);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    return (
        <>
            {(offlineReady || needRefresh) && (
                <div className="fixed bottom-4 right-4 max-w-md z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex items-start gap-3">
                            <div className="flex-1">
                                {offlineReady ? (
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            ✓ Ready to work offline
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            The app is now available offline!
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            🎉 New version available
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            Click reload to update to the latest version.
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateServiceWorker(true)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
                                            >
                                                Reload
                                            </button>
                                            <button
                                                onClick={close}
                                                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm px-4 py-2 rounded"
                                            >
                                                Later
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {offlineReady && (
                                <button
                                    onClick={close}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdatePrompt;