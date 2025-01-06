/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        gradient: "gradient 5s ease infinite",
        pokecard: "pokecard 1s ease forwards",
        fadeIn: "fadeIn .5s ease forwards",
        fadeIn2s: "fadeIn 2s ease forwards",
        rotating: "rotating .5s ease infinite"
      },
      keyframes: {
        gradient: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
        pokecard: {
            "0%": {
                translate: "100px 0"
            },
            "100%": {
                translate: "0 0"
            }
        },
        fadeIn: {
            "0%": {
                opacity: "0"
            },
            "100%": {
                opacity: "1"
            }
        },
        rotating: {
            "0%": {
                transform: "rotate(0deg)"
            },
            "100%": {
                transform: "rotate(360deg)"
            }
        }
      },
      screens: {
        // Change the default breakpoints
        'xs':'320px',
        'sm': '480px',   // Small screens start at 480px
        'md': '640px',   // Medium screens start at 768px
        'lg': '1024px',  // Large screens start at 1024px
        'xl': '1440px',  // Extra large screens start at 1440px
        '2xl': '1600px', // Add a custom breakpoint for 2xl screens
      },
    },
  },
  plugins: [],
}

