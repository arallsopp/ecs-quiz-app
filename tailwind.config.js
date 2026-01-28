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
                    50: '#f2f6f9',
                    100: '#dfe9ee',
                    200: '#c2d5df',
                    300: '#98b6c8',
                    400: '#628ca6',
                    500: '#4c748e', // <-- main colour
                    600: '#426178',
                    700: '#3a5064',
                    800: '#364554',
                    900: '#303c49',
                    950: '#1c2530'
                },
                success: {
                    50: '#f2f9ec',
                    100: '#e1f2d5',
                    200: '#c6e6b0',
                    300: '#a3d482',
                    400: '#82c15a',
                    500: '#6eb843',
                    600: '#4c832d',
                    700: '#3b6526',
                    800: '#325123',
                    900: '#2c4621',
                    950: '#15250e'
                },
                warning: {
                    50: '#fdf8ef',
                    100: '#faeeda',
                    200: '#f4dbb4',
                    300: '#edc284',
                    400: '#e59f52',
                    500: '#e08a3a',
                    600: '#d06c26',
                    700: '#ad5421',
                    800: '#8a4422',
                    900: '#70391e',
                    950: '#3c1b0e'
                },
                danger: {
                    50: '#fdf3f3',
                    100: '#fbe5e5',
                    200: '#f8d0d0',
                    300: '#f2afaf',
                    400: '#e98080',
                    500: '#dc5656',
                    600: '#c83a3a',
                    700: '#a82d2d',
                    800: '#8b2929',
                    900: '#742828',
                    950: '#3f1010'
                }

            }
        }
    },
    plugins: [],
}