import { useQuery } from '@tanstack/react-query'

import { useNotifications } from '@/components/Feedbacks'
import { axios } from '@/lib/axios'

export function Wallet() {
  const notifications = useNotifications()
  const { data: _ } = useQuery({
    queryKey: ['wallet'],
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/tosdfdos/1'),
  })
  return (
    <div>
      <h3>Wallet Page</h3>
      <button onClick={() => notifications.info('Component successfully created')}>info</button>
      <button onClick={() => notifications.success('This is a test')}>success</button>
      <button onClick={() => notifications.warning('This is a test')}>warning</button>
      <button onClick={() => notifications.error('This is a test')}>error</button>
    </div>
  )
}
