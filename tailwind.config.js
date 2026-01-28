/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Add this line!
    theme: {
        extend: {
            colors: {
                primary: {
                    '50': '#f2f6f9',
                    '100': '#dfe9ee',
                    '200': '#c2d5df',
                    '300': '#98b6c8',
                    '400': '#628ca6',
                    '500': '#4c748e', // <-- main colour
                    '600': '#426178',
                    '700': '#3a5064',
                    '800': '#364554',
                    '900': '#303c49',
                    '950': '#1c2530',
                },
                secondary: {
                    '50': '#f2f9ec',
                    '100': '#e1f2d5',
                    '200': '#c6e6b0',
                    '300': '#a3d482',
                    '400': '#82c15a',
                    '500': '#6eb843',
                    '600': '#4c832d',
                    '700': '#3b6526',
                    '800': '#325123',
                    '900': '#2c4621',
                    '950': '#15250e',
                }
            }
        }
    },
    plugins: [],
}