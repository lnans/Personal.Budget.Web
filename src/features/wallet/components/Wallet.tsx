import { useQuery } from '@tanstack/react-query'

import { axios } from '@/lib/axios'

export function Wallet() {
  const { data: _ } = useQuery({
    queryKey: ['wallet'],
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/tosdfdos/1'),
  })
  return (
    <div>
      <h3>Wallet Page</h3>
      {Array.from({ length: 100 }, (_, i) => (
        <p key={i}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, voluptatum.</p>
      ))}
    </div>
  )
}
