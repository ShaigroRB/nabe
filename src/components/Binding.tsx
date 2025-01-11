import { Kbd, Text } from '@mantine/core'

export const Binding = ({
  binding,
  desc,
}: {
  binding: string
  desc: string
}) => (
  <Text size="sm">
    <Kbd size="sm">{binding}</Kbd>: {desc}
  </Text>
)
