import { useEffect, useState } from 'react';

export const useMatchMediaQuery = (): boolean => {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const watcher = matchMedia('(min-width: 768px)');
        setMatches(watcher.matches);
        const listener = (isMatch) => setMatches(isMatch.matches);
        if (watcher.addEventListener) {
            watcher.addEventListener('change', listener);
        }
        return () => watcher.removeEventListener('change', listener);
    }, []);

    return matches;
}