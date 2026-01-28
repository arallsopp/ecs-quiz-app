function Toggle({ checked, onChange, label, count }) {
    return (
        <label className="flex items-center justify-between p-3 rounded-lg cursor-pointer md:bg-gray-50 hover:bg-gray-50 dark:md:bg-gray-700 dark:hover:bg-gray-800 transition-colors">
            <div className="flex-1">
        <span className={`text-sm font-medium text-gray-900 dark:text-gray-100
            ${checked ? 'opacity-100' : 'opacity-60'} `
        }>
          {label}
        </span>
                {count !== undefined && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
            ({count} {count === 1 ? 'question' : 'questions'})
          </div>
                )}
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={(e) => {
                    e.preventDefault();
                    onChange(!checked);
                }}
                className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          ${checked ? 'bg-primary-500' : 'bg-primary-200 dark:bg-gray-700'}
        `}
            >
        <span
            className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
            </button>
        </label>
    );
}

export default Toggle;