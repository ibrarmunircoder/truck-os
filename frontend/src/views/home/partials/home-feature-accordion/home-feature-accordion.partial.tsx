import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHomeFeatureAccordionStyles } from 'views/home/partials/home-feature-accordion/home-feature-accordion.styles';

interface SubFeature {
  ctaLink?: string;
  cta?: {
    link: string;
    target?: React.HTMLAttributeAnchorTarget;
  };
  featuredImage?: string;
  text: string;
}
interface Features {
  title: string;
  icon: React.ReactElement;
  summary: string;
  subFeatures: SubFeature[];
}

export interface HomeFeatureAccordionPartialInterface {
  features: Features[];
}

const FeatureAccordion = (props) => {
  const { features } = props;
  const classes = useHomeFeatureAccordionStyles();
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState<string | false>('panel0');

  const handleChange = (panel: string) => (_, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const renderSubFeatures = (featureList: SubFeature[]) =>
    featureList.map((feature, index) => (
      <List key={index}>
        <ListItem
          sx={{
            paddingTop: 3,
            paddingBottom: 3,
          }}
        >
          <ListItemAvatar className={classes.avatarContainer}>
            <Avatar className={classes.avatar}>{index + 1}</Avatar>
          </ListItemAvatar>

          <Grid container rowSpacing={0}>
            <Grid item xs={12}>
              {feature.featuredImage && <img src={feature.featuredImage} className={classes.featureImage} />}
            </Grid>

            <Grid item xs={12}>
              <Typography component="span" gutterBottom paragraph className={classes.subFeatureDetailsText}>
                {feature.text}
              </Typography>

              {feature.cta && (
                <Button
                  variant="contained"
                  href={feature.cta.link}
                  target={feature.cta.target}
                  className={classes.ctaButton}
                >
                  {t('dashboard.exploreBtn')}
                </Button>
              )}
            </Grid>
          </Grid>
        </ListItem>

        {
          // we don't need to display divider after last item
          index < featureList.length - 1 && <Divider className={classes.divider} />
        }
      </List>
    ));

  return (
    <div>
      {features.map((data, index) => (
        <MuiAccordion
          className={classes.root}
          disableGutters
          elevation={0}
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <MuiAccordionSummary
            aria-controls={`panel${index}d-content`}
            id={`panel${index}d-header`}
            expandIcon={<ExpandMoreIcon />}
            className={classes.accordionSummary}
          >
            <Grid container>
              <Grid item xs={1} sm="auto">
                <Box className={classes.featureIcon}>{data.icon}</Box>
              </Grid>
              <Grid item xs={10} pl={2}>
                <Typography variant="h6" className={classes.featureTitle}>
                  {data.title}
                </Typography>
                <Typography variant="body1" className={classes.featureSummary}>
                  {data.summary}
                </Typography>
              </Grid>
            </Grid>
          </MuiAccordionSummary>

          <MuiAccordionDetails className={classes.accordionDetails}>
            {renderSubFeatures(data.subFeatures)}
          </MuiAccordionDetails>
        </MuiAccordion>
      ))}
    </div>
  );
};

export const HomeFeatureAccordionPartial: FunctionComponent<HomeFeatureAccordionPartialInterface> = (props) => {
  const { features } = props;

  return <FeatureAccordion features={features} />;
};
