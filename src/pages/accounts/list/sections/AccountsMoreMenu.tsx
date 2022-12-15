import { IconButton, MenuItem } from '@mui/material'
import { Iconify, MenuPopover } from 'components'
import { MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

type AccountsMoreMenuProps = {
  onArchive: VoidFunction
  onActivate: VoidFunction
  onEdit: VoidFunction
  onDelete: VoidFunction
  accountIsArchived: boolean
}

function AccountsMoreMenu({ onArchive, onActivate, onEdit, onDelete, accountIsArchived }: AccountsMoreMenuProps) {
  const [open, setOpen] = useState<HTMLElement | null>(null)

  const { t } = useTranslation()

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem
          onClick={() => {
            onEdit()
            setOpen(null)
          }}
        >
          <Iconify icon={'eva:edit-2-outline'} sx={{ mr: 2, color: 'inherit' }} />
          {t('action.edit')}
        </MenuItem>

        {accountIsArchived ? (
          <MenuItem
            onClick={() => {
              onActivate()
              setOpen(null)
            }}
          >
            <Iconify icon={'eva:close-circle-outline'} sx={{ mr: 2, color: 'inherit' }} />
            {t('action.activate')}
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              onArchive()
              setOpen(null)
            }}
          >
            <Iconify icon={'eva:archive-outline'} sx={{ mr: 2, color: 'inherit' }} />
            {t('action.archive')}
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            onDelete()
            setOpen(null)
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2, color: 'inherit' }} />
          {t('action.delete')}
        </MenuItem>
      </MenuPopover>
    </>
  )
}

export default AccountsMoreMenu
