import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A **composition API**. Instead of one component configured by a dozen props (`title`, `subtitle`, `footer`, `showDivider`…), Card exposes parts you arrange yourself: `Card.Header`, `Card.Title`, `Card.Body`. New layouts never require changing the component.\n\n```tsx\n<Card>\n  <Card.Header><Card.Title>…</Card.Title></Card.Header>\n  <Card.Body>…</Card.Body>\n</Card>\n```",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const bodyText: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  color: "var(--color-ink-muted)",
  margin: 0,
};

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <Card.Header>
        <Card.Title>Interview loop</Card.Title>
      </Card.Header>
      <Card.Body>
        <p style={bodyText}>
          Four sessions scheduled across two days, with panel availability
          already reconciled.
        </p>
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <Badge tone="accent">Scheduled</Badge>
          <Badge>4 interviewers</Badge>
        </div>
      </Card.Body>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <Card.Header>
        <Card.Title>Candidate scorecard</Card.Title>
      </Card.Header>
      <Card.Body>
        <p style={bodyText}>
          Structured feedback collected from every interviewer before the
          debrief.
        </p>
        <div style={{ marginTop: 12 }}>
          <Button size="sm" variant="secondary">
            View details
          </Button>
        </div>
      </Card.Body>
    </Card>
  ),
};
