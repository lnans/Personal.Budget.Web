import { IconLogout, IconUserCircle } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/DropDownMenu'
import { Theme, useTheme } from '@/components/ui/ThemeProvider'
import { useAuthStore } from '@/store/authStore'

function Profile() {
  const { t } = useTranslation('common')
  const { getUsername, clearAccessToken } = useAuthStore((state) => state.actions)
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    clearAccessToken()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" icon={IconUserCircle} size="icon" className="ml-auto rounded-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{getUsername()}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={(v) => setTheme(v as Theme)}>
          <DropdownMenuRadioItem value="light">{t('theme.light')}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">{t('theme.dark')}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          {t('logout')}
          <DropdownMenuShortcut>
            <IconLogout size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile
