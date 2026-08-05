import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

/* Button is a discriminated union: pass `href` → renders <a>; omit it → <button>.
   The prop table below is generated straight from those TypeScript types. */
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A polymorphic action. Pass `href` and it renders an `<a>`; omit it and it renders a `<button>` — enforced at compile time by a discriminated union, so `<Button href=… disabled>` will not type-check. Every remaining native prop (onClick, type, target, aria-*) passes straight through.\n\n**Accessibility** — inherits the library's shared `:focus-visible` ring (keyboard only). When used as an icon-only button, pass `aria-label`.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "ghost"],
      description: "Visual weight of the action.",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary", children: "Primary" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Secondary" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Ghost" } };

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
  parameters: {
    docs: {
      description: {
        story:
          "`disabled` is only valid on the `<button>` shape. The component also sets `disabled:pointer-events-none` so it can't be clicked.",
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
};

export const AsLink: Story = {
  args: {
    href: "https://www.araxiemiller.com",
    variant: "secondary",
    children: "Renders as an <a>",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Providing `href` switches the rendered element to an anchor and unlocks anchor-only props like `target`. Passing `disabled` here would be a compile error.",
      },
    },
  },
};
