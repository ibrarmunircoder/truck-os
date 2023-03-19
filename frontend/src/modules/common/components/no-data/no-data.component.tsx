import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Container } from '@mui/material';
import { useNoDataStyles } from 'modules/common/components/no-data/no-data.styles';
import { useTranslation } from 'next-i18next';
import { ReactElement } from 'react';

export const NoDataComponent = ({ text }: { text?: string }): ReactElement => {
  const styles = useNoDataStyles()
  const { t } = useTranslation();
  return (
    <Container className={styles.container}>
      <DescriptionIcon fontSize={'large'} />
      <Box sx={{ mt: 1 }} style={{
        width: '30%',
        textAlign: 'center'
      }}>{text || t('no-records-to-display')}</Box>
    </Container>)
}


