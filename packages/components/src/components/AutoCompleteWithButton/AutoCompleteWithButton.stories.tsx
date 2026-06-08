import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import AutoCompleteWithButton from './AutoCompleteWithButton'
import type { SelectOption } from './AutoCompleteWithButton'

const brokers: SelectOption[] = [
  { value: 'b1', label: 'Goldman Sachs' },
  { value: 'b2', label: 'Morgan Stanley' },
  { value: 'b3', label: 'JP Morgan' },
]

const meta: Meta<typeof AutoCompleteWithButton> = {
  title: 'Components/AutoCompleteWithButton',
  component: AutoCompleteWithButton,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    required: { control: 'boolean' },
    buttonLoading: { control: 'boolean' },
    buttonLabel: { control: 'text' },
    error: { control: 'text' },
    label: { control: 'text' },
    onButtonClick: { action: 'button clicked' },
    onChange: { action: 'changed' },
  },
  args: {
    name: 'broker',
    value: null,
    options: brokers,
    buttonLabel: 'Load',
    fullWidth: true,
  },
}
export default meta
type Story = StoryObj<typeof AutoCompleteWithButton>

export const Default: Story = {
  args: { label: 'Counterparty Broker', placeholder: 'Select broker…', buttonLabel: 'Search' },
}

export const ButtonLoading: Story = {
  args: { label: 'Broker', buttonLabel: 'Loading…', buttonLoading: true },
}

export const Disabled: Story = {
  args: { label: 'Broker', buttonLabel: 'Load', disabled: true },
}

export const WithError: Story = {
  args: { label: 'Broker', buttonLabel: 'Load', error: 'Please select a broker.' },
}

function ControlledDemo() {
  const [value, setValue] = useState<SelectOption | null>(null)
  const [opts, setOpts] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState(false)

  const handleLoad = () => {
    setLoading(true)
    setTimeout(() => {
      setOpts(brokers)
      setLoading(false)
    }, 1000)
  }

  return (
    <AutoCompleteWithButton
      name="broker"
      value={value}
      onChange={(v) => setValue(v as SelectOption | null)}
      options={opts}
      label="Counterparty"
      placeholder="Click Load to fetch options"
      buttonLabel="Load"
      onButtonClick={handleLoad}
      buttonLoading={loading}
    />
  )
}
export const Interactive: Story = { render: () => <ControlledDemo /> }
