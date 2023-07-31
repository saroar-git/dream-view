import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useBook = () => {
      const { user } = useAuth();
      const query = useQuery({
            queryKey: ['book', user?.email],
            queryFn: async () => {
                  if (user?.email) {
                        const res = await fetch(`https://dream-view-server-kappa.vercel.app/book?email=${user.email}`);
                        return res.json();
                  }
                  return [];
            }
      });

      return [query.data || [], query.refetch, query.isLoading];
};

export default useBook;
