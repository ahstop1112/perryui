import type { Meta, StoryObj } from '@storybook/react'
import PDFViewer from './PDFViewer'

const meta: Meta<typeof PDFViewer> = {
  title: 'Components/PDFViewer',
  component: PDFViewer,
  argTypes: {
    zoomable: { control: 'boolean' },
    initialZoom: { control: { type: 'number', min: 0.5, max: 3, step: 0.25 } },
  },
}
export default meta

type Story = StoryObj<typeof PDFViewer>

export const Default: Story = {
  args: {
    url: 'about:blank',
    title: 'Sample PDF',
    zoomable: true,
  },
}
export const WithDownload: Story = {
  args: {
    url: 'about:blank',
    title: 'Sample PDF',
    zoomable: true,
    onDownload: () => alert('Download clicked'),
  },
}
export const NoZoom: Story = {
  args: {
    url: 'about:blank',
    title: 'Sample PDF',
    zoomable: false,
  },
}
export const ZoomedIn: Story = {
  args: {
    url: 'about:blank',
    title: 'Sample PDF',
    zoomable: true,
    initialZoom: 1.5,
  },
}
