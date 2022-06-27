module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark_blue: '#1C6E8C',
                light_gray: '#F9F7F7',
                light_blue: '#DBE2EF',
                medium_blue: '#007ee5',
                main_bg: '#12141d',
                forumly_blk: '#28282B'
            },

            fontSize: {
                xs: [
                    "0.75rem",
                    {
                        lineHeight: "1.5",
                    },
                ],
                sm: [
                    "0.875rem",
                    {
                        lineHeight: "1.5715",
                    },
                ],
                base: [
                    "1rem",
                    {
                        lineHeight: "1.5",
                    },
                ],
                lg: [
                    "1.125rem",
                    {
                        lineHeight: "1.5",
                    },
                ],
                xl: [
                    "1.25rem",
                    {
                        lineHeight: "1.5",
                    },
                ],
                "2xl": [
                    "1.5rem",
                    {
                        lineHeight: "1.33",
                    },
                ],
                "3xl": [
                    "1.88rem",
                    {
                        lineHeight: "1.33",
                    },
                ],
            },
        }
    },
    plugins: [],
};
