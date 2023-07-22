export default {
    content: [
        './index.html',
        './src/**/*.{jsx,js,html}',
    ],
    theme: {
        extend: {
            colors: {
                'primary': 'rgba(226, 237, 247, 0.98)',
                'secondary': 'rgb(255, 255, 255)',
                'accent-color-one': 'rgba(49, 130, 122, 0.5)',
                'logo-green': '#147970',
                'logo-green-hover': '#26837b',
                'logo-yellow': '#FCBD02',
                'danger-color': '#FF6C6C',
                'dark-primary': 'rgba(20, 25, 29, 0.98)', // Darkened version of 'primary' color
                'dark-secondary': 'rgb(0, 0, 0)', // Black color for the secondary background
                'dark-accent-color-one': 'rgba(20, 60, 55, 0.5)', // Darkened version of 'accent-color-one'
                'dark-logo-green': '#073838', // Darkened version of 'logo-green'
                'dark-logo-green-hover': '#0d4340', // Darkened version of 'logo-green-hover'
                'dark-logo-yellow': '#6c5400', // Darkened version of 'logo-yellow'
                'dark-danger-color': '#b53131', // Darkened version of 'danger-color'
            },
        },
    },
    darkMode: 'class',
    plugins: [],
};
