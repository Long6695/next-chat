import instance from '@/utils/request';
import { useQuery } from '@tanstack/react-query'

async function fetchCurrentUser() {
    return await instance("user/me");
  }

const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: fetchCurrentUser,
  })
}

export { fetchCurrentUser, useCurrentUser }