import { useState } from 'react'
import { Button, Stack } from '@mui/material'
import { AlertDialogs } from '../AlertDialogs'
import styles from './ClaimFilters.module.css'

export interface ClaimFiltersProps {
  selectedCount: number
  showClaim?: boolean
  showUnclaim?: boolean
  onClaim?: () => void
  onUnclaim?: () => void
  claimLabel?: string
  unclaimLabel?: string
}

export function ClaimFilters({
  selectedCount,
  showClaim = true,
  showUnclaim = true,
  onClaim,
  onUnclaim,
  claimLabel = 'Bulk Claim',
  unclaimLabel = 'Bulk Unclaim',
}: ClaimFiltersProps) {
  const [unclaimDialogOpen, setUnclaimDialogOpen] = useState(false)

  const isDisabled = selectedCount < 1

  const handleClaimClick = () => {
    if (onClaim) onClaim()
  }

  const handleUnclaimClick = () => setUnclaimDialogOpen(true)
  const handleUnclaimCancel = () => setUnclaimDialogOpen(false)
  const handleUnclaimConfirm = () => {
    setUnclaimDialogOpen(false)
    if (onUnclaim) onUnclaim()
  }

  return (
    <>
      <Stack direction="row" spacing={1} className={styles.container}>
        {showClaim && (
          <Button
            variant="contained"
            color="primary"
            disabled={isDisabled}
            onClick={handleClaimClick}
            className={styles.button}
          >
            {claimLabel}
          </Button>
        )}
        {showUnclaim && (
          <Button
            variant="outlined"
            color="inherit"
            disabled={isDisabled}
            onClick={handleUnclaimClick}
            className={styles.button}
          >
            {unclaimLabel}
          </Button>
        )}
      </Stack>
      <AlertDialogs
        open={unclaimDialogOpen}
        title="Confirm Bulk Unclaim"
        content={`Unclaim ${selectedCount} selected item(s)?`}
        text4Ok="Unclaim"
        text4Cancel="Cancel"
        okColor="error"
        onOk={handleUnclaimConfirm}
        onCancel={handleUnclaimCancel}
      />
    </>
  )
}
