import Typography from '@mui/material/Typography'

export interface DynamicFormSectionHeaderProps {
  title?: string
}

const DynamicFormSectionHeader = ({ title }: DynamicFormSectionHeaderProps) => {
  if (!title) return null
  return (
    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
      {title}
    </Typography>
  )
}

export default DynamicFormSectionHeader
