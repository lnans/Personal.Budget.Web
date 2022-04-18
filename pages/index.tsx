import type { NextPage } from 'next'
import { useState } from 'react'
import VsButton from '../components/VsButton'
import VsSelect from '../components/VsSelect'
import { toastAlertService } from '../components/VsToaster'

const Home: NextPage = () => {
  const [load, setLoad] = useState<boolean>(true)
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
