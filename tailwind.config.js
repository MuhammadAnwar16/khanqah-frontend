/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Elite White-Based Theme
        white: '#FFFFFF',               // Primary background
        mist: '#F5F5F5',                // Card BG / Light sections
        border: '#D1D1D1',              // Borders / lines
        black: '#000000',               // Main text (jet black)
        subtext: '#6B6B6B',             // Muted / soft charcoal
        hover: '#EDEDED',               // Hover & feedback bg
        shadow: 'rgba(0,0,0,0.08)',     // Soft ambient shadow

        
      },
      fontFamily: {
        urdu: ['"Noto Nastaliq Urdu"', '"Scheherazade New"', 'serif'],
        heading: ['"Cormorant Garamond"', 'serif'],
      body: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0,0,0,0.08)', // Custom soft depth shadow
      },
    },
  },
  plugins: [],
};
