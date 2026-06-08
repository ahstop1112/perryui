import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import styles from './DataList.module.scss'

export interface DataListItem {
  id?: string | number
  label: string
  url: string
  mimeType?: string
}

export interface DataListProps {
  items: DataListItem[]
  emptyMessage?: string
  onItemClick?: (item: DataListItem) => void
}

const DataList = ({
  items,
  emptyMessage = 'No attachments available.',
  onItemClick,
}: DataListProps) => {
  if (items.length === 0) {
    return (
      <Typography className={styles.empty} color="text.secondary">
        {emptyMessage}
      </Typography>
    )
  }

  const handleClick = (item: DataListItem) => {
    if (onItemClick) {
      onItemClick(item)
    } else {
      window.open(item.url, '_blank')
    }
  }

  return (
    <List disablePadding className={styles.list}>
      {items.map((item, index) => (
        <ListItem key={item.id ?? index} disablePadding>
          <ListItemButton onClick={() => handleClick(item)} className={styles.itemButton}>
            <ListItemIcon className={styles.icon}>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              secondary={item.mimeType}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default DataList
