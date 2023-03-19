import { roqMakeStyles } from 'modules/common/utils';

interface TitleHeaderClasses {
  container: string;
  ctaButton: string;
  buttonLink: string;
}

export const useTitleHeaderStyles = roqMakeStyles<TitleHeaderClasses>(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '1.5rem',
    padding: '0 8px',
  },
  ctaButton: {
    color: 'white',
    marginLeft: 14,
    '& a': {
      color: 'inherit',
    },
  },
  buttonLink: {
    color: 'inherit',
  },
}));
