import { Button, CheckBox, Dialog, TextInput, SelectInput, toastSender, CurrencyInput, DatePicker } from '@components'
import { useFormValidator } from '@hooks/useFormWithSchema'
import { useState } from 'react'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import * as Yup from 'yup'

type TestForm = {
  user: string
  amount: number
}

const TestFormValidator = Yup.object().shape({
  user: Yup.string().required('errors.required'),
  amount: Yup.number().typeError('type error').required('errors.required'),
})

export default function TestBedPage() {
  const [load, setLoad] = useState<boolean>(true)
  const [display, setDisplay] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidator<TestForm>(TestFormValidator)

  const onSubmit: SubmitHandler<TestForm> = (data: TestForm) => {
    console.log(data)
  }

  const onError: SubmitErrorHandler<TestForm> = (errors) => {
    console.log(errors)
  }

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
        <DatePicker label="Date d'ouverture" />
      </div>
      <div style={styles}>
        <SelectInput
          label="Select an option"
          items={testValues}
          itemKey="id"
          itemValue="value"
          message="Required"
        ></SelectInput>
        <SelectInput label="Select an option" items={testValues} itemKey="id" itemValue="value"></SelectInput>
      </div>
      <div style={styles}>
        <TextInput label="Type a text" defaultValue="" icon="bx-user" error="test" />
        <TextInput label="I'm disabled" defaultValue="" disabled />
        <TextInput label="I'm disabled" defaultValue="" loading />
      </div>
      <div style={styles}>
        <CheckBox value={false} label="Option" />
        <TextInput label="Type a text" defaultValue="" />
      </div>
      <form style={styles} onSubmit={handleSubmit(onSubmit, onError)}>
        <TextInput
          fullWidth
          label="User"
          defaultValue=""
          register={register}
          name="user"
          icon="bx-user"
          error={errors?.user?.message ?? ''}
        />
        <CurrencyInput
          fullWidth
          label="Montant"
          defaultValue={10}
          register={register}
          name="amount"
          error={errors.amount?.message ?? ''}
        />
        <Button color="primary" style={{ marginTop: '26px' }}>
          Test
        </Button>
      </form>

      <Dialog title="Bienvenue sur Budget." show={display} onClose={() => setDisplay(false)} width="350px">
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0 16px 16px 16px' }}>
          <TextInput label="Nom d'utilisateur" defaultValue="" fullWidth icon="bx-user" />
          <TextInput label="Mot de passe" defaultValue="" fullWidth icon="bxs-lock" type="password" />
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
