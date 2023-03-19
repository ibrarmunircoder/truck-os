import CopyAllIcon from '@mui/icons-material/CopyAll';
import DeleteIcon from '@mui/icons-material/DeleteForeverRounded';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/GetAppRounded';
import { Grid, IconButton, Link, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from 'modules/auth/hooks';
import { LoadingSkeleton, Table, TableColumnInterface } from 'modules/common/components';
import { OrderEnum } from 'modules/common/enums';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { TableRowInterface } from 'modules/common/interfaces';
import { FormattedDate } from 'modules/date-time/components';
import { FileTypeChip } from 'modules/file/components/file-type-chip';
import { FileTypeEnum } from 'modules/file/enums';
import { FormAlert } from 'modules/forms/components';
import { FileInterface } from 'modules/user-files/interfaces';
import { singleUserFileSelector } from 'modules/user-files/selectors';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCopyToClipboard } from 'react-use';
import routes from 'routes';
import { useUserFiles } from 'views/files/hooks/use-user-files.hook';
import { useUserFilesUpload } from 'views/files/hooks/use-user-files-upload.hook';
import { UserFileEditPartial } from 'views/files/partials/user-file-edit/user-file-edit.partial';
import { useUserFilesTableStyles } from 'views/files/partials/user-files-table/user-files-table.styles';

interface FilesTableRowInterface extends FileInterface, TableRowInterface { }

interface UserFilesTablePartialInterface {
  onFileDelete: (file: FilesTableRowInterface) => void;
  onFileDownload: (file: FilesTableRowInterface) => void;
  onFilesSelection: (files: FilesTableRowInterface[]) => void;
  selectedUserFiles: FilesTableRowInterface[];
}

export const UserFilesTablePartial: FunctionComponent<UserFilesTablePartialInterface> = (
  props: UserFilesTablePartialInterface,
) => {
  const classes = useUserFilesTableStyles();
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [overlay, setOverlay] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [showUrlIsCopied, setShowUrlIsCopied] = useState(false);
  const [hoveredFileId, setHoveredFileId] = useState(null);
  const { isLoading, files, totalCount } = useUserFiles();
  const { handlePageChange, handlePageRowsCountChange, handleOrderChange, pageNumber, pageSize, order } = useUserFilesUpload();
  const { onFileDelete, onFileDownload, onFilesSelection, selectedUserFiles } = props;
  const [, copyToClipboard] = useCopyToClipboard();
  const { previousEditedFile } = useSelector(singleUserFileSelector);
  const theme = useTheme();

  useEffect(() => {
    if (id !== null && selectedFileId === null) {
      setSelectedFileId(id);
      setOverlay('open');
    }
  }, [selectedFileId, router]);

  const handleClose = () => {
    setShowUrlIsCopied(false);
  };

  const handleCopyUrl = (fileUrl) => {
    copyToClipboard(fileUrl);
    setShowUrlIsCopied(true);
  };

  const renderActionsButtons = (rowData: FilesTableRowInterface) => (
    <Grid container alignItems="center" justifyContent="flex-end">
      {rowData.isPublic && (
        <Tooltip title={t('file.copy-file-public-link')} onClick={() => handleCopyUrl(rowData.url)}>
          <IconButton data-cy="user-files-table-single-copy-btn" className={classes.tableIcon}>
            <CopyAllIcon />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title={t('title_edit-user-file')}>
        <IconButton
          data-cy="user-files-table-single-edit-btn"
          className={classes.tableIcon}
          onClick={() => {
            setOverlay('open');
            setSelectedFileId(rowData.id);
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('files.delete-file')}>
        <IconButton
          data-cy="user-files-table-single-delete-btn"
          onClick={() => onFileDelete(rowData)}
          className={classes.tableIcon}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  );

  const handleMouseEnterFileNameCellValue = (fileId) => setHoveredFileId(fileId);

  const handleMouseLeaveFileNameCellValue = () => setHoveredFileId(null);

  const renderFileName = (rowData: FilesTableRowInterface) => (
    <Grid
      container
      alignItems="center"
      flexWrap={'nowrap'}
      component="div"
      onMouseEnter={() => handleMouseEnterFileNameCellValue(rowData.id)}
      onMouseLeave={() => handleMouseLeaveFileNameCellValue()}
    >
      <Grid item zeroMinWidth>
        <Link
          href={rowData.url}
          onClick={(event) => event.preventDefault()}
          className={classes.fileName}
          title={rowData.name}
          target="_blank"
          rel="noreferrer"
        >
          <span onClick={() => onFileDownload(rowData)} className={classes.longTextCell}>
            {rowData.name}{' '}
          </span>
        </Link>
      </Grid>

      <Grid item xs="auto" visibility={hoveredFileId === rowData.id ? 'visible' : 'hidden'}>
        <Tooltip title={t('files.download-file')}>
          <IconButton
            data-cy="user-files-table-single-download-btn"
            onClick={() => onFileDownload(rowData)}
            className={classes.tableIcon}
          >
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );

  const columns: TableColumnInterface<FilesTableRowInterface>[] = [
    {
      title: t('name'),
      field: 'name',
      render: (rowData) => renderFileName(rowData),
    },
    {
      title: t('upload.success.files'),
      field: 'createdAt',
      render: (rowData) => (
        <Grid container direction="column" justifyContent="center">
          <Grid item>
            <FormattedDate date={rowData.createdAt} timezone={user.timezone} twoLines />
          </Grid>
        </Grid>
      ),
    },
    {
      title: t('type'),
      field: 'isPublic',
      render: (rowData) => (
        <Grid container>
          <FileTypeChip type={rowData.isPublic ? FileTypeEnum.PUBLIC_FILE : FileTypeEnum.PRIVATE_FILE} />
        </Grid>
      ),
    },
    {
      title: t('action'),
      render: renderActionsButtons,
      sorting: false,
      headerStyle: {
        textAlign: 'right',
        paddingRight: theme.spacing(4),
      },
    },
  ];

  const handleOverlayClose = () => {
    if (router.route === routes.files && previousEditedFile === null) {
      setOverlay(null);
      setSelectedFileId(null);
      return false;
    }

    if (router.route === routes.files && previousEditedFile !== null) {
      return router.reload();
    }

    // we still keep the deep link,
    // so this block is to handle the scenario where the user is going directly to this URL
    // http://localhost:3000/files/edit/04de2c13-59b1-4aa4-baa7-fd35882f6591
    if (router.route === routes.filesEdit) {
      void router.replace({
        route: routes.files,
      });
      return false;
    }
  };

  const handleDrawerFormSuccess = () => {
    handleOverlayClose();
  };

  useEffect(() => {
    const columnIndex = columns.findIndex((column) => column.field === order.sort);

    if (columnIndex >= 0) {
      columns[columnIndex].defaultSort = order.order === OrderEnum.ASC ? 'asc' : 'desc';
    }
  }, [order]);
  const data = useMemo(
    () =>
      files.map((row) => ({
        ...row,
        tableData: {
          checked: selectedUserFiles.some((file) => file.id === row.id),
        },
      })),
    [files, selectedUserFiles],
  );

  return (
    <>
      {isLoading && <LoadingSkeleton />}

      {!isLoading && (
        <Table
          page={pageNumber}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handlePageRowsCountChange}
          onOrderChange={handleOrderChange}
          order={order}
          totalCount={totalCount}
          columns={columns}
          isLoading={isLoading}
          data={data}
          noDataText={t('no-files-to-display')}
          onSelectionChange={onFilesSelection}
          options={{
            paginationType: 'stepped',
            pageSize,
            showTitle: false,
            search: false,
            sorting: true,
            toolbar: false,
            draggable: false,
            selection: true,
            thirdSortClick: false,
          }}
        />
      )}

      <UserFileEditPartial
        onSuccess={handleDrawerFormSuccess}
        open={Boolean(overlay)}
        onClose={handleOverlayClose}
        fileId={selectedFileId}
      />

      <FormAlert
        data-cy="user-files-table-copy-link-alert"
        open={showUrlIsCopied}
        partialSuccess={true}
        onClose={handleClose}
        message={t('file.copy-url-link')}
      />
    </>
  );
};
