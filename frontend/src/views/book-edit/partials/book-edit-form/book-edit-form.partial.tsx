import { CircularProgress, Grid, InputAdornment, Paper, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { FileInterface } from 'modules/common/interfaces';
import { EXAMPLE_FORM_FIELD_MAX_LENGTH } from 'modules/example/constants';
import { AuthorInterface } from 'modules/example/interfaces';
import { FormAlert } from 'modules/forms/components';
import { AsyncSelect } from 'modules/forms/components/async-select';
import { CheckboxField } from 'modules/forms/components/checkbox-field';
import { DateField } from 'modules/forms/components/date-field';
import { FileUploadField } from 'modules/forms/components/file-upload-field';
import { useEnhancedFormik } from 'modules/forms/hooks';
import React from 'react';
import routes from 'routes';
import { useBookEditAuthorSelectQuery, useBookEditFormSchema } from 'views/book-edit/hooks';
import { BookEditFormValuesInterface } from 'views/book-edit/interfaces';
import { useBookEditFormStyles } from 'views/book-edit/partials/book-edit-form/book-edit-form.styles';

interface BookEditFormPartialInterface {
  onSubmit: (formValues: BookEditFormValuesInterface) => void;
  initialValues: BookEditFormValuesInterface;
}

export const BookEditFormPartial: React.FC<BookEditFormPartialInterface> = (props) => {
  const { onSubmit, initialValues } = props;
  const { t } = useTranslation();
  const router = useRouter();
  const classes = useBookEditFormStyles();

  const {
    setFieldValue,
    handleSubmit,
    handleChange,
    values,
    visibleErrors,
    handleBlur,
    isSubmitting,
    status,
    resetStatus,
    handleReset,
  } = useEnhancedFormik({
    initialValues,
    onSubmit,
    validationSchema: useBookEditFormSchema(),
  });

  const authorSelectQuery = useBookEditAuthorSelectQuery();

  const onFileRemove = (i: number, file: File | FileInterface) => {
    void setFieldValue(
      'files',
      values.files.filter((_, idx) => idx !== i),
    );

    if (file instanceof File) {
      void setFieldValue(
        'newFiles',
        values.newFiles.filter((f) => f.name !== file.name),
      );
    } else {
      void setFieldValue('removedFiles', [...values.removedFiles, file]);
    }
  };

  return (
    <Paper classes={classes.paper}>
      <Grid container justifyContent="space-between">
        <Typography variant="h5" color="primary">
          {t('book-create.update-header')}
        </Typography>
      </Grid>

      <form onSubmit={handleSubmit} className={classes.formSection}>
        {status && (
          <FormAlert
            open
            error={status.error}
            message={t('book-create.updated-successfully-alert')}
            onClose={resetStatus}
          />
        )}

        <Grid container rowSpacing={2} columnSpacing={6}>
          <Grid item md={5} xs={12}>
            <TextField
              variant="standard"
              name="title"
              label={t('book-create.title')}
              value={values.title}
              helperText={visibleErrors.title}
              error={Boolean(visibleErrors.title)}
              inputProps={{ maxLength: EXAMPLE_FORM_FIELD_MAX_LENGTH }}
              fullWidth
              autoFocus={true}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <AsyncSelect<AuthorInterface>
              variant="standard"
              name="authorId"
              label={t('book-create.authorId')}
              value={values.authorId}
              query={authorSelectQuery}
              error={Boolean(visibleErrors.authorId)}
              initialLimit={10}
              limitIncrement={2}
              extractOption={(row) => ({ value: row.id, label: `${row.name} ${row.surname}` })}
              getOptionFilter={(value) => ({ id: { valueIn: [value] } })}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item md={10} xs={12}>
            <TextField
              variant="standard"
              name="description"
              label={t('book-create.description')}
              value={values.description}
              helperText={visibleErrors.description}
              error={Boolean(visibleErrors.description)}
              fullWidth
              multiline
              autoFocus={true}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <TextField
              variant="standard"
              name="price"
              type="number"
              label={t('book-create.price')}
              value={values.price}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              helperText={visibleErrors.price}
              error={Boolean(visibleErrors.price)}
              fullWidth
              autoFocus={true}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <DateField
              value={values.publishingDate}
              onChange={(date) => setFieldValue('publishingDate', new Date(date).toDateString())}
              textFieldProps={{
                variant: 'standard',
                name: 'publishingDate',
                label: t('book-create.publishingDate'),
                helperText: visibleErrors.publishingDate,
                error: Boolean(visibleErrors.publishingDate),
                fullWidth: true,
                autoFocus: true,
                onReset: handleReset,
                onBlur: handleBlur,
              }}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <CheckboxField
              fieldLabel={t('book-create.published.label')}
              checkboxLabel={t('book-create.published.yes')}
              name="published"
              checked={values.published}
              autoFocus={true}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
              size="small"
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <CheckboxField
              fieldLabel={t('book-create.outOfStock.label')}
              checkboxLabel={t('book-create.outOfStock.yes')}
              name="outOfStock"
              checked={values.outOfStock}
              autoFocus={true}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
              size="small"
            />
          </Grid>
          <Grid item md={10} xs={12}>
            <FileUploadField
              variant="standard"
              label={t('book-create.fileUpload')}
              value={values.files}
              onChange={(files) => {
                void setFieldValue('files', [...values.files, ...files]);
                void setFieldValue('newFiles', [...values.newFiles, ...files]);
              }}
              onRemove={onFileRemove}
              maxFiles={Math.max(3 - values.files.length, 0)}
              accept={['application/pdf', 'image/png', 'image/jpeg']}
              disabled={values.files.length >= 3}
              helperText={Array.isArray(visibleErrors.files) ? '' : visibleErrors.files}
              error={Array.isArray(visibleErrors.files) ? false : Boolean(visibleErrors.files)}
            />
          </Grid>
        </Grid>

        <Stack spacing={2} direction="row" sx={{ mt: 3.5 }}>
          <Button disabled={isSubmitting} type="submit" variant="contained" color="primary">
            {t('book-create.saveButton')}
            {isSubmitting && <CircularProgress sx={{ ml: 1 }} size={20} />}
          </Button>
          <Button variant="outlined" color="error" onClick={() => router.push({ route: routes.exampleBooks })}>
            {t('book-create.cancelButton')}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
