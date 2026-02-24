import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "@/components/layout/navbar/Navbar";

const meta = {
    component:Navbar,
    title: "Components/Navbar",
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MainNav = {
    args: {},
};