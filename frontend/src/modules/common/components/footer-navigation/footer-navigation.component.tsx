import { TypographyProps } from '@mui/material/Typography';
import {
  FooterNavigationClasses,
  useFooterNavigationStyles,
} from 'modules/common/components/footer-navigation/footer-navigation.styles';
import { RoqLink } from 'modules/common/components/roq-link';
import { useTranslation } from 'modules/common/hooks';
import { ReactElement } from 'react';
import routes from 'routes';

type FooterNavigationProps = TypographyProps & {
  classes?: FooterNavigationClasses;
};

export const FooterNavigation = (props: FooterNavigationProps): ReactElement => {
  const classes = useFooterNavigationStyles(props);
  const { t } = useTranslation();

  return (
    <ul className={classes.root}>
      <li>
        <RoqLink classes={classes.link} variant="body2" href={{ query: routes.imprint }}>
          {t('link-text.imprint')}
        </RoqLink>
      </li>
      <li>
        <RoqLink classes={classes.link} variant="body2" href={{ query: routes.terms }}>
          {t('link-text.terms')}
        </RoqLink>
      </li>
      <li>
        <RoqLink classes={classes.link} variant="body2" href={{ query: routes.privacy }}>
          {t('link-text.privacy')}
        </RoqLink>
      </li>
      <li>
        <RoqLink classes={classes.link} variant="body2" href={{ query: routes.dataPreferences }}>
          {t('link-text.data-preference')}
        </RoqLink>
      </li>
    </ul>
  );
};
