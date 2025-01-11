import { Box } from '@mantine/core'

export const PlaceholderLogo = ({ size }: { size: number }) => (
  <Box
    size={size}
    style={{ borderRadius: '50%', backgroundColor: 'red', color: 'white' }}
  >
    logo
  </Box>
)
