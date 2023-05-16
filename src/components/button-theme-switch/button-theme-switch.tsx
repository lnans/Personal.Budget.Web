import { Icon } from '@iconify/react/dist/iconify.js'
import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { useCallback } from 'react'

function ButtonThemeSwitch() {
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

export default ButtonThemeSwitch
