module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          500: "#3b82f6",
        },
        gray: {
          800: "#2d3748",
          50: "#f7fafc",
        },
      },
      boxShadow: {
        "xl-blue": "0 4px 10px rgba(59, 130, 246, 0.5)",
      },
    },
  },
  plugins: [],
};
