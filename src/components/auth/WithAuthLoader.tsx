import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import LoginForm from './LoginForm'
import colors from '../../styles/_colors.module.scss'
import { authService } from '../../services/authService'

export interface WithAuthLoaderProps {
  children: ReactNode
}

export default function WithAuthLoader(props: WithAuthLoaderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const { t } = useTranslation()

  const checkAuthentication = async () => {
    await authService
      .getAuthInfo()
      .then(() => setIsAuthenticated(true))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    checkAuthentication()
  }, [])

  return (
    <>
      {isLoading ? (
        <LoaderContainerStyled>
          <p>{t('app')}</p>
          <LoaderStyled />
        </LoaderContainerStyled>
      ) : (
        <>{!isAuthenticated ? <LoginForm onLogged={setIsAuthenticated} /> : props.children}</>
      )}
    </>
  )
}

const LoaderContainerStyled = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & p {
    color: ${() => `rgba(${colors.primary}, 1)`};
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 16px;
  }
`

const LoaderStyled = styled('div')`
  width: 40px;
  height: 40px;
  pointer-events: none;
  border-radius: 50%;
  box-sizing: border-box;
  background: inherit;

  &:before {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    content: '';
    border: ${() => `4px dashed rgba(${colors.primary},1)`};
    border-radius: inherit;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
    animation: loader 0.6s linear infinite;
    opacity: 0.2;
  }

  &:after {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    content: '';
    border: ${() => `4px solid rgba(${colors.primary},1)`};
    border-radius: inherit;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
    animation: loader 0.6s ease infinite;
  }
`
