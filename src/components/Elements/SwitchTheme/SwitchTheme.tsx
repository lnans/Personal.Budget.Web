import { Icon } from '@iconify/react'
import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { useCallback } from 'react'

export function SwitchTheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const handleSwitchTheme = useCallback(() => {
    toggleColorScheme()
  }, [toggleColorScheme])

  return (
    <ActionIcon radius="xl" variant="transparent" onClick={handleSwitchTheme}>
      <Icon icon={colorScheme === 'light' ? 'ph:moon' : 'ph:sun'} height="1.525rem" />
    </ActionIcon>
  )
}
