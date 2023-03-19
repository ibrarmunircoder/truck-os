import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonGroup, Typography } from '@mui/material';
import { RoqLink } from 'modules/common/components';
import { useTitleHeaderStyles } from 'modules/example/components/title-header/title-header.styles';
import { useTranslation } from 'next-i18next';
import React from 'react';
import routes from 'routes';

interface IProps {
  page: 'Author' | 'Book';
}

export const TitleHeader: React.FC<IProps> = ({ page }) => {
  const { t } = useTranslation();
  const classes = useTitleHeaderStyles();
  const title = page === 'Author' ? t('author.title-plural') : t('book.title-plural');
  return (
    <div className={classes.container}>
      <Typography variant="h4">{title}</Typography>
      <div>
        <ButtonGroup size="small">
          <Button
            variant={page === 'Author' ? 'contained' : 'outlined'}
            color={page === 'Author' ? 'secondary' : 'inherit'}
          >
            <RoqLink className={classes.buttonLink} href={{ route: routes.exampleAuthors }}>
              {t('author.title-plural')}
            </RoqLink>
          </Button>
          <Button
            variant={page === 'Book' ? 'contained' : 'outlined'}
            color={page === 'Book' ? 'secondary' : 'inherit'}
          >
            <RoqLink className={classes.buttonLink} href={{ route: routes.exampleBooks }}>
              {t('book.title-plural')}
            </RoqLink>
          </Button>
        </ButtonGroup>
        <Button className={classes.ctaButton} variant="contained" color="primary" startIcon={<AddIcon />}>
          <RoqLink href={{ route: page === 'Author' ? routes.exampleCreateAuthor : routes.exampleCreateBook }}>
            {page === 'Author' ? t('author.add') : t('book.add')}
          </RoqLink>
        </Button>
      </div>
    </div>
  );
};

// t('author.add');
// t('book.add');
