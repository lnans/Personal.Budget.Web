import { APP_ROUTES } from '@constants'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../styles/_colors.module.scss'

export default function NavBar() {
  const [currentPath, setCurrentPath] = useState<string>('/')
  const { t } = useTranslation()
  const navigate = useNavigate()

  const location = useLocation()
  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location])

  return (
    <NavBarContainerStyled>
      <NavBarTitleStyled>{t('app')}</NavBarTitleStyled>
      <NavBarSelectorContainerStyled>
        <NavBarSelectorStyled
          isSelected={currentPath === APP_ROUTES.dashboard.path}
          onClick={() => navigate(APP_ROUTES.dashboard.path)}
        >
          <i className={APP_ROUTES.dashboard.icon}></i>
          {t(APP_ROUTES.dashboard.name)}
        </NavBarSelectorStyled>
        <NavBarSelectorStyled
          isSelected={currentPath.startsWith(APP_ROUTES.accounts.path)}
          onClick={() => navigate(APP_ROUTES.accounts.path)}
        >
          <i className={APP_ROUTES.accounts.icon}></i>
          {t(APP_ROUTES.accounts.name)}
        </NavBarSelectorStyled>
        <NavBarSelectorStyled
          isSelected={currentPath.startsWith(APP_ROUTES.test.path)}
          onClick={() => navigate(APP_ROUTES.test.path)}
        >
          <i className={APP_ROUTES.test.icon}></i>
          {t(APP_ROUTES.test.name)}
        </NavBarSelectorStyled>
      </NavBarSelectorContainerStyled>
    </NavBarContainerStyled>
  )
}

const NavBarContainerStyled = styled('nav')`
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  position: fixed;
  top: 0;
  align-items: center;
  z-index: 1;
  box-shadow: 0 5px 12px -7px rgb(0 0 0 / 5%);
`

const NavBarTitleStyled = styled('p')`
  color: ${() => `rgba(${colors.primary}, 1)`};
  font-weight: 900;
  font-size: 1.5rem;
  display: flex;
  padding-inline: 40px;
  cursor: default;
`

const NavBarSelectorContainerStyled = styled('div')`
  display: flex;
  height: 100%;
`

const NavBarSelectorStyled = styled('button')<{ isSelected: boolean }>`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  padding-inline: 21px;
  border: 0;
  outline: none;
  background-color: rgba(255, 255, 25, 0);
  height: 100%;
  color: ${(props) => (props.isSelected ? `rgba(${colors.primary}, 1)` : `rgba(${colors.black}, 1)`)};
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;

  transition: background-color 0.25s ease;

  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => (props.isSelected ? `rgba(${colors.primary}, 1)` : `rgba(${colors.primary}, 0)`)};

  & i {
    font-size: 1.2rem;
    padding-right: 10px;
    color: ${(props) => (props.isSelected ? `inherit` : `rgba(${colors.black}, .5)`)};
  }

  &:hover {
    background-color: ${() => `rgba(${colors.primary}, .05)`};
  }
`
