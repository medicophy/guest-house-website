import { Room } from './types';

const API_URL = 'http://localhost:5000'; // This should be in an env file later

export const getRooms = async (): Promise<Room[]> => {
  const response = await fetch(`${API_URL}/rooms`);
  if (!response.ok) {
    throw new Error('Failed to fetch rooms');
  }
  return response.json();
};
