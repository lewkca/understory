import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./Field";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "A labelled text input with optional hint and error states.\n\n**Accessibility is the point of this component:**\n- `useId()` generates a unique id so `<label htmlFor>` always targets the input.\n- the hint/error message is linked with `aria-describedby`, so screen readers announce it with the field.\n- the error state sets `aria-invalid`, so the failure is announced, not just shown in red.\n\nTab into the field to see the shared `:focus-visible` ring. Open the **Accessibility** panel to see the live axe results.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    placeholder: { control: "text" },
  },
  args: { label: "Full name", placeholder: "Araxie Miller" },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    label: "Email",
    placeholder: "you@company.com",
    hint: "We'll only use this for candidate updates.",
  },
};

export const WithError: Story = {
  args: {
    label: "Work email",
    defaultValue: "not-an-email",
    error: "Enter a valid email address.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `error` is set, the input gets `aria-invalid` and `aria-describedby` points at the error text — the message is announced, not merely colored.",
      },
    },
  },
};
