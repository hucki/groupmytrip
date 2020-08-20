import { useQuery, QueryResult } from 'react-query';
import { client } from '../services/ApiClient';
import { useAuth0 } from '@auth0/auth0-react';
import { Trip } from '../types/Trip';

export function useTrips(): QueryResult<Trip[]> & { trips: Trip[] } {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const tripsQuery = useQuery('trips', async () => {
    let accessToken;
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    }
    return client<Trip[]>('trips', { accessToken });
  });

  const trips = tripsQuery.data ?? [];

  return {
    trips,
    ...tripsQuery,
  };
}

export function useTrip(
  id: string
): QueryResult<Trip> & { trip: Trip | undefined } {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const tripsQuery = useQuery(['trip', id], async () => {
    let accessToken;
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    }
    return client<Trip>(`trips/${id}`, { accessToken });
  });

  const trip = tripsQuery.data;

  return {
    trip,
    ...tripsQuery,
  };
}
