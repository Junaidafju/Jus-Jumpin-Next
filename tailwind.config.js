/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                pink: '#f67edd',
                green: '#6dc065',
                orange: '#ff661a',
                cyan: '#00b9e3',
                rose: '#ff5da0',
                yellow: '#ffc60b',
                lime: '#b2d235',
                red: '#ff3645',
                purple: '#8869d2',
                blue: '#4facfe'
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'bounce-slow': 'bounce 3s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'wiggle': 'wiggle 1s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                }
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(to right, #ff661a, #ff3645, #f67edd)',
                'kids-gradient': 'linear-gradient(to right, #4facfe, #00b9e3, #6dc065)',
                'celebration-gradient': 'linear-gradient(to right, #ffc60b, #ff661a, #ff3645)',
                'card-gradient': 'linear-gradient(to bottom, #8869d2, #f67edd)',
            }
        },
    },
    plugins: [],
}