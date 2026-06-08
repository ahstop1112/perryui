import type { Meta, StoryObj } from '@storybook/react'
import FilePreviewer from './FilePreviewer'

const meta: Meta<typeof FilePreviewer> = {
  title: 'Components/FilePreviewer',
  component: FilePreviewer,
  argTypes: {
    open: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof FilePreviewer>

export const ImagePreview: Story = {
  args: {
    open: true,
    file: { name: 'passport.jpg', type: 'image/jpeg', url: 'https://picsum.photos/800/600' },
    onClose: () => {},
    onDownload: () => {},
  },
}
export const PdfPreview: Story = {
  args: {
    open: true,
    file: { name: 'document.pdf', type: 'application/pdf', url: 'about:blank' },
    onClose: () => {},
  },
}
export const UnsupportedType: Story = {
  args: {
    open: true,
    file: { name: 'spreadsheet.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', url: '' },
    onClose: () => {},
  },
}
export const Closed: Story = {
  args: {
    open: false,
    file: { name: 'document.pdf', type: 'application/pdf', url: 'about:blank' },
    onClose: () => {},
  },
}
