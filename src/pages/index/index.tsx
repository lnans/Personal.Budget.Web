import { useState } from 'react'
import { RsButton, RsCheckBox, RsDialog, RsHeader, RsInput, RsSelect, toastAlertService } from '../../components'

export default function HomePage() {
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
        <RsButton color="primary" onClick={() => setLoad(!load)}>
          Set Load
        </RsButton>
        <RsButton color="primary" onClick={() => setDisplay(true)}>
          Open Dialog
        </RsButton>
        <RsButton color="error">Supprimer</RsButton>
        <RsButton
          color="success"
          onClick={() => toastAlertService.info('Action', 'Nouvelle opération créé avec succès !')}
        >
          Toast !
        </RsButton>
        <RsButton color="primary" disabled>
          disabled
        </RsButton>
        <RsButton color="primary" loading={load}>
          loading
        </RsButton>
      </div>
      <div style={styles}>
        <RsSelect
          label="Select an option"
          items={testValues}
          itemKey="id"
          itemValue="value"
          message="Required"
        ></RsSelect>
        <RsSelect label="Select an option" items={testValues} itemKey="id" itemValue="value" loading></RsSelect>
      </div>
      <div style={styles}>
        <RsInput label="Type a text" value="" icon="bx-user" message="test" />
        <RsInput label="Type a text" value="" />
      </div>
      <div style={styles}>
        <RsCheckBox value={false} label="Option" />
        <RsInput label="Type a text" value="" />
      </div>

      <RsDialog show={display} onClose={() => setDisplay(false)} width="350px">
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0 16px 16px 16px' }}>
          <RsHeader>
            <h4>
              Bienvenue sur <b>Budget.</b>
            </h4>
          </RsHeader>
          <RsInput label="Nom d'utilisateur" value="" fullWidth icon="bx-user" />
          <RsInput label="Mot de passe" value="" fullWidth icon="bxs-lock" type="password" />
          <RsButton color="primary" fullWidth style={{ marginTop: '16px' }}>
            Connexion
          </RsButton>
        </div>
      </RsDialog>
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
