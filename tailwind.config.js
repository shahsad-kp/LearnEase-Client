export default {
    content: [
        './index.html',
        './src/**/*.{jsx,js,html}',
    ],
    theme: {
        extend: {
            colors: {
                // Bright Mode Colors
                'primary': 'rgba(226, 237, 247, 0.98)',
                'secondary': 'rgb(255, 255, 255)',
                'accent-color-one': 'rgba(49, 130, 122, 0.5)',
                'logo-green': '#147970',
                'logo-green-hover': '#26837b',
                'logo-yellow': '#FCBD02',
                'danger-color': '#FF6C6C',

                // Dark Mode Colors (Darker Versions)
                'dark-primary': 'rgba(45, 55, 64, 0.98)', // Brighter blueish color
                'dark-secondary': 'rgb(30, 30, 30)', // Brighter blackish color for the secondary background
                'dark-accent-color-one': 'rgba(25, 90, 85, 0.5)', // Brighter teal color
                'dark-logo-green': '#0C4C4C', // Brighter version of 'logo-green'
                'dark-logo-green-hover': '#146161', // Brighter version of 'logo-green-hover'
                'dark-logo-yellow': '#876500', // Brighter version of 'logo-yellow'
                'dark-danger-color': '#C04141', // Brighter version of 'danger-color'
            },
        },
    },
    darkMode: 'class',
    plugins: [],
};
