
import { useEffect, useState } from 'react';
import { createTables } from '../lib/database';

export const useDatabase = () => {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await createTables();
        setInitialized(true);
      } catch (err) {
        console.error('Database initialization error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    initializeDatabase();
  }, []);

  return { initialized, error };
};
