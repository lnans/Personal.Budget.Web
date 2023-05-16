import { useQuery } from '@tanstack/react-query'
import { ErrorResponse, TagData } from 'api/contracts'

const TAGS_KEY = 'tags'

function useGetTags() {
  return useQuery<TagData[], ErrorResponse>({
    queryKey: [TAGS_KEY],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))

      return [
        {
          name: 'Tag 1',
          color: '#123456',
        },
        {
          name: 'Tag 2',
          color: '#654321',
        },
        {
          name: 'Tag 3',
          color: '#123654',
        },
      ]
    },
  })
}

export { useGetTags }
