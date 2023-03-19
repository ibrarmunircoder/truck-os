import { Typography } from '@mui/material';
import { useFooterStyles } from 'layouts/main/partials/footer/footer.styles';
import { useInterval, useTranslation } from 'modules/common/hooks';
import { FC, useState } from 'react';

export const Footer: FC = () => {
  const classes = useFooterStyles();
  const { t } = useTranslation();
  const [scrollable, setScrollable] = useState(false);

  /**
   * Continuously calculate so that the Footer can reliably determine
   * whether the page is scrollable or not.
   */
  useInterval(() => {
    const isScrollable = (node) => {
      const overflowY = window.getComputedStyle(node)['overflow-y'];
      return (overflowY === 'scroll' || overflowY === 'auto') && node.scrollHeight > node.clientHeight;
    };

    const mainLayout = document.getElementById('main-layout');

    if (mainLayout !== null) {
      setScrollable(isScrollable(mainLayout));
    }
  }, 1000);

  return scrollable ? (
    <footer className={classes.root}>
      <Typography className={classes.copyright} variant="body2" component="p">
        &copy; {t('copyright-footer')}
      </Typography>
    </footer>
  ) : null;
};
