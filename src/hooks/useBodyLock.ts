import { useEffect } from 'react';

export default function useBodyLock(isModalOpened: boolean) {
  useEffect(() => {
    if (isModalOpened) {
      document.body.classList.add('lock');
    } else {
      document.body.classList.remove('lock');
    }
  }, [isModalOpened]);
}
