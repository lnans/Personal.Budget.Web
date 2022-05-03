import { Button, CheckBox, Dialog, TextField, SelectField, toastSender } from '@components'
import { useState } from 'react'

export default function TestPage() {
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={styles}>
        <Button color="primary" onClick={() => setLoad(!load)}>
          Set Load
        </Button>
        <Button color="primary" onClick={() => setDisplay(true)}>
          Open Dialog
        </Button>
        <Button color="error">Supprimer</Button>
        <Button color="success" onClick={() => toastSender.info('Action', 'Nouvelle opération créé avec succès !')}>
          Toast !
        </Button>
        <Button color="primary" disabled>
          disabled
        </Button>
        <Button color="primary" loading={load}>
          loading
        </Button>
      </div>
      <div style={styles}>
        <SelectField
          label="Select an option"
          items={testValues}
          itemKey="id"
          itemValue="value"
          message="Required"
        ></SelectField>
        <SelectField label="Select an option" items={testValues} itemKey="id" itemValue="value"></SelectField>
      </div>
      <div style={styles}>
        <TextField label="Type a text" value="" icon="bx-user" message="test" />
        <TextField label="I'm disabled" value="" disabled />
        <TextField label="I'm disabled" value="" loading />
      </div>
      <div style={styles}>
        <CheckBox value={false} label="Option" />
        <TextField label="Type a text" value="" />
      </div>

      <Dialog title="Bienvenue sur Budget." show={display} onClose={() => setDisplay(false)} width="350px">
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0 16px 16px 16px' }}>
          <TextField label="Nom d'utilisateur" value="" fullWidth icon="bx-user" />
          <TextField label="Mot de passe" value="" fullWidth icon="bxs-lock" type="password" />
          <Button color="primary" fullWidth style={{ marginTop: '16px' }}>
            Connexion
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

const styles = {
  borderRadius: '12px',
  backgroundColor: '#fff',
  display: 'flex',
  margin: '12px auto',
  padding: '20px',
  minWidth: '650px',
}
