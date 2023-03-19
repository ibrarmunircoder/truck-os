import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import keyBy from 'lodash/keyBy';
import GrayCheckIcon from 'modules/common/icons/roq-check-circle-outline-gray-icon.svg';
import GreenCheckIcon from 'modules/common/icons/roq-check-circle-outline-green-icon.svg';
import { useValidationErrorsStyles } from 'modules/forms/components/validation-errors/validation-errors.styles';
import { ValidationRuleInterface } from 'modules/forms/hooks/use-validation.hook';
import React, { FunctionComponent, useMemo } from 'react';
import { ValidationError } from 'yup';

export interface ValidationErrorsInterface {
  title: string;
  rules: ValidationRuleInterface[];
  errors: ValidationError[];
}

interface ValidationRules {
  name: string;
  message: string;
  error: boolean;
}

export const ValidationErrors: FunctionComponent<ValidationErrorsInterface> = (props) => {
  const { errors, rules, title } = props;
  const classes = useValidationErrorsStyles();

  const items = useMemo(() => {
    const errorsIndexed = keyBy(errors, (x) => x.type);

    return rules.map((rule) => ({
      name: rule.name,
      // TODO: refactor it later
      message: rule.message.replace(/password must /, ''),
      error: !!errorsIndexed[rule.name],
    }));
  }, [errors, rules]);

  const CheckIcon = ({ error }) => (error ? <GrayCheckIcon /> : <GreenCheckIcon />);

  return (
    <Paper elevation={0}>
      <Typography variant="body2" className={classes.title}>{title}</Typography>
      <List>
        {(items || []).map((x: ValidationRules) => (
          <ListItem key={x.name} className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <CheckIcon error={x.error} />
            </ListItemIcon>

            <ListItemText
              primary={x.message}
              className={x.error ? classes.listItemTextError : classes.listItemTextValid}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
