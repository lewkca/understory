import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A small status pill in three tones. Accepts every native `<span>` prop on top of `tone`.\n\n**Accessibility** — a badge conveys meaning through color, so don't rely on tone alone. Keep the text label descriptive (e.g. “Scheduled”, not just a colored dot).",
      },
    },
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["neutral", "accent", "danger"],
      table: { defaultValue: { summary: "neutral" } },
    },
    children: { control: "text" },
  },
  args: { children: "Badge", tone: "neutral" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { tone: "neutral", children: "Neutral" } };
export const Accent: Story = { args: { tone: "accent", children: "Accent" } };
export const Danger: Story = { args: { tone: "danger", children: "Danger" } };

export const AllTones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="accent">Accent</Badge>
      <Badge tone="danger">Danger</Badge>
    </div>
  ),
};
