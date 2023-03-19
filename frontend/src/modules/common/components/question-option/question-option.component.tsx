import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useQuestionOptionStyles } from 'modules/common/components/question-option/question-option.styles';
import { colors } from 'modules/common/utils/colors';
import React, { FunctionComponent } from 'react';

interface IRadioOption {
  label: string;
  value: string | boolean;
}

interface IQuestionOptionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | boolean;
  options: IRadioOption[];
}

export const QuestionOption: FunctionComponent<IQuestionOptionProps> = ({
  title,
  description,
  name,
  onChange,
  value,
  options,
  ...rest
}) => {
  const classes = useQuestionOptionStyles();
  return (
    <article className={classes.questionOption} {...rest}>
      <h2 className={classes.questionOptionTitle}>{title}</h2>
      <p className={classes.questionOptionDescription}>{description}</p>
      <RadioGroup
        className={classes.questionOptionRadiopGroup}
        aria-labelledby="question-answer-radio"
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option: IRadioOption, index: number) => (
          <FormControlLabel
            key={'option' + index}
            value={option.value}
            control={
              <Radio
                sx={{
                  '& .MuiSvgIcon-root': {
                    width: '42px',
                    height: '42px',
                  },
                  color: colors.primary,
                  '&.Mui-checked': {
                    color: colors.primary,
                  },
                }}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
    </article>
  );
};
