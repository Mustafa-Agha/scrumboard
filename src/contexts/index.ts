import { useContext, createContext } from 'react';
import { store } from 'hooks/stores';

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
};