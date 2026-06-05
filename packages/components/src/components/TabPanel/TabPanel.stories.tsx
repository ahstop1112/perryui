import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, Tab, Box } from '@mui/material'
import { TabPanel } from './TabPanel'

const meta: Meta<typeof TabPanel> = {
  title: 'Components/TabPanel',
  component: TabPanel,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number', description: 'Currently selected tab index' },
    index: { control: 'number', description: "This panel's index" },
    idPrefix: { control: 'text', description: 'Prefix for aria ids' },
  },
  args: { value: 0, index: 0, idPrefix: 'tab' },
}
export default meta
type Story = StoryObj<typeof TabPanel>

export const Default: Story = {
  args: { value: 0, index: 0 },
  render: (args) => (
    <TabPanel {...args}>
      <p>This is the content of Tab Panel 0.</p>
    </TabPanel>
  ),
}

export const Hidden: Story = {
  args: { value: 1, index: 0 },
  render: (args) => (
    <TabPanel {...args}>
      <p>This content is hidden (value !== index).</p>
    </TabPanel>
  ),
}

function InteractiveDemo() {
  const [tab, setTab] = useState(0)
  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="demo tabs">
        <Tab label="Overview" id="tab-0" aria-controls="tabpanel-0" />
        <Tab label="Positions" id="tab-1" aria-controls="tabpanel-1" />
        <Tab label="History" id="tab-2" aria-controls="tabpanel-2" />
      </Tabs>
      <TabPanel value={tab} index={0}><p>Overview content</p></TabPanel>
      <TabPanel value={tab} index={1}><p>Positions content</p></TabPanel>
      <TabPanel value={tab} index={2}><p>History content</p></TabPanel>
    </Box>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
}
