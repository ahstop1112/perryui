import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TransferList } from './TransferList'

const SAMPLE_ITEMS = [
  { id: 1, title: 'Equity Trading' },
  { id: 2, title: 'Fixed Income' },
  { id: 3, title: 'FX Derivatives' },
  { id: 4, title: 'Commodities' },
  { id: 5, title: 'Credit Default Swaps' },
  { id: 6, title: 'Interest Rate Swaps' },
  { id: 7, title: 'Structured Products' },
  { id: 8, title: 'Repo & Securities Lending' },
]

const meta: Meta<typeof TransferList> = {
  title: 'Components/TransferList',
  component: TransferList,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    leftTitle: { control: 'text' },
    rightTitle: { control: 'text' },
    onChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<typeof TransferList>

export const Default: Story = {
  render: (args) => {
    const [chosenIds, setChosenIds] = useState<Array<number | string>>([3, 6])
    return (
      <TransferList
        {...args}
        items={SAMPLE_ITEMS}
        chosenIds={chosenIds}
        onChange={(ids) => {
          setChosenIds(ids)
          args.onChange(ids)
        }}
      />
    )
  },
  args: {
    leftTitle: 'Choices',
    rightTitle: 'Chosen',
    disabled: false,
  },
}

export const AllAvailable: Story = {
  render: (args) => {
    const [chosenIds, setChosenIds] = useState<Array<number | string>>([])
    return (
      <TransferList
        {...args}
        items={SAMPLE_ITEMS}
        chosenIds={chosenIds}
        onChange={(ids) => {
          setChosenIds(ids)
          args.onChange(ids)
        }}
      />
    )
  },
  args: {
    leftTitle: 'Available Products',
    rightTitle: 'Selected Products',
    disabled: false,
  },
}

export const AllChosen: Story = {
  render: (args) => {
    const [chosenIds, setChosenIds] = useState<Array<number | string>>(
      SAMPLE_ITEMS.map((i) => i.id)
    )
    return (
      <TransferList
        {...args}
        items={SAMPLE_ITEMS}
        chosenIds={chosenIds}
        onChange={(ids) => {
          setChosenIds(ids)
          args.onChange(ids)
        }}
      />
    )
  },
  args: {
    leftTitle: 'Choices',
    rightTitle: 'Chosen',
    disabled: false,
  },
}

export const Disabled: Story = {
  render: (args) => {
    const [chosenIds, setChosenIds] = useState<Array<number | string>>([2, 5])
    return (
      <TransferList
        {...args}
        items={SAMPLE_ITEMS}
        chosenIds={chosenIds}
        onChange={(ids) => {
          setChosenIds(ids)
          args.onChange(ids)
        }}
      />
    )
  },
  args: {
    leftTitle: 'Choices',
    rightTitle: 'Chosen',
    disabled: true,
  },
}
