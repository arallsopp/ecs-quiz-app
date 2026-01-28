function About({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">About</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4 text-gray-700 dark:text-gray-400">
                    <p className="text-sm leading-relaxed">
                        Passing the ECS HSE Assessment demonstrates your competence in the industry
                        minimum standard for workplace health, safety, and environmental standards.
                    </p>

                    <div className="border-t pt-4 text-xs text-gray-500 dark:text-gray-450 space-y-1">
                        <p>Written for Edward Allsopp</p>
                        <p>January 2025</p>
                        <p>Uses the <a
                            className="text-primary-500 hover:underline"
                            href="https://www.ecscard.org.uk/getmedia/2bfce807-2289-4a51-a23e-b1c6f801f3e3/ECS-HSE-Revision-Guide-24-pdf.pdf"
                            target="_blank"
                        >revision guide</a> from <a
                            className="text-primary-500 hover:underline"
                            href="https://www.ecscard.org.uk"
                            target="_blank">ECScard.org</a>
                        </p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default About;