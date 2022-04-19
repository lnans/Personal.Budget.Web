import type { NextPage } from 'next'
import styled from 'styled-components'
import VsButton from '../../components/VsButton'
import VsCheckBox from '../../components/VsCheckBox'
import VsDialog from '../../components/VsDialog'
import VsHeader from '../../components/VsHeader'
import VsInput from '../../components/VsInput'
import { toastAlertService } from '../../components/VsToaster'
import colors from '../../styles/modules/colors.module.scss'

const Login: NextPage = () => {
  return (
    <VsDialog show={true} closable={false} width="350px">
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0 16px 16px 16px' }}>
        <VsHeader>
          <MessageStyled>
            Bienvenue sur <b>Budget.</b>
          </MessageStyled>
        </VsHeader>
        <VsInput label="Nom d'utilisateur" value="" fullWidth icon="bx-user" />
        <VsInput label="Mot de passe" value="" fullWidth icon="bxs-lock" type="password" />
        <VsCheckBox label="Rester connecté" value={false} compact />
        <VsButton
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
          onClick={() => toastAlertService.info('Connexion', "Cette fonctionnalité n'est pas encore implémentée !")}
        >
          Connexion
        </VsButton>
        <InfoStyled>Nouveau ici ? Contact moi 😄</InfoStyled>
      </div>
    </VsDialog>
  )
}

const MessageStyled = styled('h4')`
  & b {
    color: ${() => `rgb(${colors.primary})`};
  }
`

const InfoStyled = styled('div')`
  margin-top: 20px;
  padding: 0;
  font-size: 0.7rem;
  text-align: center;
`

export default Login
