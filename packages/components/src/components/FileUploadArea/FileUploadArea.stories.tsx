import type { Meta, StoryObj } from '@storybook/react'
import FileUploadArea from './FileUploadArea'

const meta: Meta<typeof FileUploadArea> = {
  title: 'Components/FileUploadArea',
  component: FileUploadArea,
  argTypes: {
    variant: { control: { type: 'radio' }, options: ['normal', 'compact'] },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    maxSizeMB: { control: 'number' },
  },
}
export default meta

type Story = StoryObj<typeof FileUploadArea>

export const Default: Story = {
  args: {
    files: [],
    onFilesChange: () => {},
    label: 'Drop files here or click to upload',
    hint: 'Max 10 MB',
  },
}
export const Compact: Story = {
  args: {
    files: [],
    onFilesChange: () => {},
    variant: 'compact',
    label: 'Upload file',
  },
}
export const Disabled: Story = {
  args: {
    files: [],
    onFilesChange: () => {},
    disabled: true,
    label: 'Upload disabled',
  },
}
export const WithFiles: Story = {
  args: {
    files: [
      { name: 'document.pdf', size: 1024 * 512, type: 'application/pdf', file: new File([], 'document.pdf') },
      { name: 'photo.jpg', size: 1024 * 1024 * 2.5, type: 'image/jpeg', file: new File([], 'photo.jpg') },
    ],
    onFilesChange: () => {},
  },
}
