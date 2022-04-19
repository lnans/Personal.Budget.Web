import type { NextPage } from 'next'
import { useState } from 'react'
import VsButton from '../components/VsButton'
import VsCheckBox from '../components/VsCheckBox'
import VsDialog from '../components/VsDialog'
import VsHeader from '../components/VsHeader'
import VsInput from '../components/VsInput'
import VsSelect from '../components/VsSelect'
import { toastAlertService } from '../components/VsToaster'

const Home: NextPage = () => {
  const [load, setLoad] = useState<boolean>(true)
  const [display, setDisplay] = useState<boolean>(false)
  const testValues = [
    {
      id: '1',
      value: 'Label 1',
    },
    {
      id: '2',
      value: 'Label 2',
    },
    {
      id: '3',
      value: 'Label 3',
    },
    {
      id: '4',
      value: 'Label 4',
    },
    {
      id: '5',
      value: 'Label 5',
    },
    {
      id: '6',
      value: 'Label 6',
    },
    {
      id: '7',
      value: 'Label 7',
    },
  ]

  return (
    <>
      <div style={styles}>
        <VsButton color="primary" onClick={() => setLoad(!load)}>
          Set Load
        </VsButton>
        <VsButton color="primary" onClick={() => setDisplay(true)}>
          Open Dialog
        </VsButton>
        <VsButton color="error">Supprimer</VsButton>
        <VsButton
          color="success"
          onClick={() => toastAlertService.info('Action', 'Nouvelle opération créé avec succès !')}
        >
          Toast !
        </VsButton>
        <VsButton color="primary" disabled>
          disabled
        </VsButton>
        <VsButton color="primary" loading={load}>
          loading
        </VsButton>
      </div>
      <div style={styles}>
        <VsSelect
          label="Select an option"
          items={testValues}
          itemKey="id"
          itemValue="value"
          message="Required"
        ></VsSelect>
        <VsSelect label="Select an option" items={testValues} itemKey="id" itemValue="value" loading></VsSelect>
      </div>
      <div style={styles}>
        <VsInput label="Type a text" value="" icon="bx-user" message="test" />
        <VsInput label="Type a text" value="" />
      </div>
      <div style={styles}>
        <VsCheckBox value={false} label="Option" />
        <VsInput label="Type a text" value="" />
      </div>

      <VsDialog show={display} onClose={() => setDisplay(false)} width="350px">
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0 16px 16px 16px' }}>
          <VsHeader>
            <h4>
              Bienvenue sur <b>Budget.</b>
            </h4>
          </VsHeader>
          <VsInput label="Nom d'utilisateur" value="" fullWidth icon="bx-user" />
          <VsInput label="Mot de passe" value="" fullWidth icon="bxs-lock" type="password" />
          <VsButton color="primary" fullWidth style={{ marginTop: '16px' }}>
            Connexion
          </VsButton>
        </div>
      </VsDialog>
    </>
  )
}

const styles = {
  borderRadius: '12px',
  backgroundColor: '#fff',
  display: 'flex',
  margin: '12px auto',
  padding: '20px',
  maxWidth: '600px',
}

export default Home
