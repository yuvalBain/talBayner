// .storybook/preview.tsx
import RootLayout from "@/app/layout";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import type { Preview } from "@storybook/react";
import React from "react";

const preview: Preview = {
    parameters: {
        backgrounds: { disabled: true },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    globalTypes: {
        theme: {
            description: "Theme",
            toolbar: {
                title: "Theme",
                icon: "circlehollow",
                items: ["light", "dark"],
                dynamicTitle: true,
            },
        },
    },
    decorators: [
        (Story, { globals }) => {
            // You can wrap Story in providers or theme logic here
            return <ThemeProvider>
            <Story />
            </ThemeProvider>;
        },
    ],
};

export default preview;