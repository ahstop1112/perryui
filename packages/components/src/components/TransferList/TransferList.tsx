import React, { useState } from 'react'
import {
  Grid,
  List,
  Card,
  CardHeader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  Divider,
} from '@mui/material'
import styles from './TransferList.module.scss'

export interface TransferItem {
  /** Unique identifier */
  id: number | string
  /** Display label */
  title: string
}

export interface TransferListProps {
  /** All available items (both lists combined) */
  items: TransferItem[]
  /** IDs of items currently on the right (chosen) side */
  chosenIds: Array<number | string>
  /** Called when user moves items; receives new array of chosen IDs */
  onChange: (chosenIds: Array<number | string>) => void
  /** Disables all interactions */
  disabled?: boolean
  /** Label for the left (available) list */
  leftTitle?: string
  /** Label for the right (chosen) list */
  rightTitle?: string
}

function not<T>(a: T[], b: T[]): T[] {
  return a.filter((v) => !b.includes(v))
}

function intersection<T>(a: T[], b: T[]): T[] {
  return a.filter((v) => b.includes(v))
}

function union<T>(a: T[], b: T[]): T[] {
  return [...a, ...not(b, a)]
}

const TransferList = ({
  items,
  chosenIds,
  onChange,
  disabled = false,
  leftTitle = 'Choices',
  rightTitle = 'Chosen',
}: TransferListProps) => {
  const allIds = items.map((item) => item.id)
  const rightIds = chosenIds.filter((id) => allIds.includes(id))
  const leftIds = allIds.filter((id) => !rightIds.includes(id))

  const [left, setLeft] = useState<Array<number | string>>(leftIds)
  const [right, setRight] = useState<Array<number | string>>(rightIds)
  const [checked, setChecked] = useState<Array<number | string>>([])

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const titleMap = Object.fromEntries(items.map((item) => [item.id, item.title]))

  const handleToggle = (id: number | string) => () => {
    const idx = checked.indexOf(id)
    const newChecked = [...checked]
    if (idx === -1) {
      newChecked.push(id)
    } else {
      newChecked.splice(idx, 1)
    }
    setChecked(newChecked)
  }

  const numberOfChecked = (ids: Array<number | string>) =>
    intersection(checked, ids).length

  const handleToggleAll = (ids: Array<number | string>) => () => {
    if (numberOfChecked(ids) === ids.length) {
      setChecked(not(checked, ids))
    } else {
      setChecked(union(checked, ids))
    }
  }

  const handleMoveRight = () => {
    const newRight = right.concat(leftChecked)
    setRight(newRight)
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
    onChange(newRight)
  }

  const handleMoveLeft = () => {
    const newRight = not(right, rightChecked)
    setLeft(left.concat(rightChecked))
    setRight(newRight)
    setChecked(not(checked, rightChecked))
    onChange(newRight)
  }

  const renderList = (title: string, ids: Array<number | string>) => (
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(ids)}
            checked={numberOfChecked(ids) === ids.length && ids.length > 0}
            indeterminate={
              numberOfChecked(ids) !== ids.length && numberOfChecked(ids) > 0
            }
            disabled={disabled || ids.length === 0}
            inputProps={{ 'aria-label': `select all ${title}` }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(ids)}/${ids.length} selected`}
      />
      <Divider />
      <List dense component="div" role="list" className={styles.list}>
        {ids.map((id) => (
          <ListItem
            key={id}
            role="listitem"
            button
            onClick={handleToggle(id)}
            disabled={disabled}
          >
            <ListItemIcon>
              <Checkbox
                checked={checked.includes(id)}
                tabIndex={-1}
                disableRipple
                disabled={disabled}
                inputProps={{ 'aria-labelledby': `transfer-item-${id}` }}
              />
            </ListItemIcon>
            <ListItemText
              id={`transfer-item-${id}`}
              primary={titleMap[id]}
            />
          </ListItem>
        ))}
        <ListItem />
      </List>
    </Card>
  )

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" className={styles.root}>
      <Grid item className={styles.listContainer}>
        {renderList(leftTitle, left)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" className={styles.buttonGroup}>
          <Button
            variant="outlined"
            size="small"
            className={styles.button}
            onClick={handleMoveRight}
            disabled={disabled || leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={styles.button}
            onClick={handleMoveLeft}
            disabled={disabled || rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item className={styles.listContainer}>
        {renderList(rightTitle, right)}
      </Grid>
    </Grid>
  )
}

export default TransferList
