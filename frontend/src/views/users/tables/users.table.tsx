import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useAuth } from 'modules/auth/hooks';
import { LoadingSkeleton, RoqLink, Table, TableColumnInterface } from 'modules/common/components';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { FormattedDate } from 'modules/date-time/components';
import { FormAlert } from 'modules/forms/components';
import { ThemeEnum } from 'modules/theme/enums';
import { UserInviteStatusEnum } from 'modules/user-invites/enums';
import { UserStatus } from 'modules/users/components/user-status';
import { UserTableToggleButtonGroupEnum } from 'modules/users/components/user-table-toggle-button-group/user-table-toggle-button-group.component';
import { UserInterface } from 'modules/users/interfaces';
import { singleUserSelector } from 'modules/users/selectors';
import { shortenUserId } from 'modules/users/util';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import routes from 'routes';
import { useUsersTable } from 'views/users/hooks';
import { UserEditFormPartial } from 'views/users/partials/user-edit-form/user-edit-form.partial';
import { useUserInvitesTableStyles } from 'views/users/tables/user-invites.table.styles';

interface UsersTablePropsInterface {
  userFilter: UserTableToggleButtonGroupEnum;
}

export const UsersTable: FunctionComponent<UsersTablePropsInterface> = ({ userFilter }) => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const classes = useUserInvitesTableStyles();
  const { user: authUser } = useAuth();
  const { t } = useTranslation();
  const [overlay, setOverlay] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userIsUpdated, setUserIsUpdated] = useState(null);
  const { previousEditedUser } = useSelector(singleUserSelector);
  const {
    isLoading,
    users,
    totalCount,
    pageNumber,
    order,
    pageSize,
    handlePageChange,
    handleOrderChange,
    error,
  } = useUsersTable(userFilter);

  useEffect(() => {
    if (id !== null && selectedUserId === null) {
      setSelectedUserId(id);
      setOverlay('open');
    }
  }, [selectedUserId, router]);

  useEffect(() => {
    if (error && error.message.includes('Unauthorized')) {
      void router.push({
        route: routes.home,
      });
    }
  }, [error]);

  const formatLastLogin = useCallback(
    (rowData: UserInterface) => {
      const loginTimestamp = rowData.lastLogin?.timestamp;
      return loginTimestamp ? <FormattedDate date={loginTimestamp} timezone={authUser.timezone} twoLines /> : null;
    },
    [authUser.timezone],
  );

  const renderActiveStatus = (rowData: UserInterface) => (
    <UserStatus status={rowData.active ? UserInviteStatusEnum.ACTIVE : UserInviteStatusEnum.INACTIVE} />
  );

  const renderEmailLink = (rowData: UserInterface) => (
    <RoqLink href={`mailto:${rowData.email}`}>
      <a className={classes.emailLink}>{rowData.email}</a>
    </RoqLink>
  );

  const renderOptedIn = useCallback(
    (rowData: UserInterface) => {
      const optedInAt = rowData?.optedInAt;
      return optedInAt ? <FormattedDate date={optedInAt} timezone={authUser.timezone} twoLines /> : null;
    },
    [authUser.timezone],
  );

  const renderActionButtons = (rowData: UserInterface) => (
    <Grid container wrap="nowrap">
      <IconButton
        data-cy="users-table-edit-btn"
        onClick={(event) => {
          event.stopPropagation();
          setSelectedUserId(rowData.id);
          setOverlay('open');
        }}
        className={classes.tableIcon}
      >
        <EditIcon />
      </IconButton>
    </Grid>
  );

  const handleOverlayClose = () => {
    if ((router.route === routes.usersActive || router.route === routes.usersInactive) && previousEditedUser === null) {
      setOverlay(null);
      setSelectedUserId(null);
      return false;
    }

    if ((router.route === routes.usersActive || router.route === routes.usersInactive) && previousEditedUser !== null) {
      return router.reload();
    }

    // we still keep the deep link,
    // so this block is to handle the scenario where the user is going directly to this URL
    // http://localhost:3000/users/edit/04de2c13-59b1-4aa4-baa7-fd35882f6591
    if (router.route === routes.userEdit) {
      void router.replace({
        route: routes.usersActive,
      });
      return false;
    }
  };

  const handleDrawerFormSuccess = () => {
    setUserIsUpdated(true);
    setOverlay(null);
  };

  const handleRowClick = (event, rowData: UserInterface) => {
    void router.push({
      pathname: `/${routes.userReceivables}`,
      search: `?${new URLSearchParams({
        account: rowData.account.id,
        accountName: rowData.firstName + '-' + rowData.lastName,
      })}`,
    });
  };

  const usersTableColumns: TableColumnInterface<UserInterface>[] = [
    {
      title: t('user-id'),
      field: 'id',
      render: (rowData: UserInterface) => shortenUserId(rowData.id),
    },
    {
      title: t('first-name'),
      field: 'firstName',
    },
    {
      title: t('last-name'),
      field: 'lastName',
    },
    {
      title: t('email'),
      field: 'email',
      render: renderEmailLink,
    },
    {
      title: t('timezone'),
      field: 'timezone',
    },
    {
      title: t('locale'),
      field: 'locale',
    },
    {
      title: t('last-login'),
      field: 'lastLogin.timestamp',
      render: formatLastLogin,
      sorting: false,
    },
    {
      title: t('user-status'),
      field: 'status',
      render: renderActiveStatus,
      sorting: false,
    },
    {
      title: t('opted-in-at'),
      render: renderOptedIn,
      sorting: false,
    },
    {
      title: t('kyc-status'),
      field: 'account.kycStatus',
      sorting: false,
    },
    {
      title: t('action'),
      render: renderActionButtons,
      sorting: false,
    },
  ];

  const tableData = useMemo(() => users.map((user) => ({ ...user })), [users]);

  if (error) {
    return <FormAlert error={error} autoHideDuration={3000} />;
  }

  return (
    <>
      {isLoading && <LoadingSkeleton />}

      {!isLoading && (
        <Table
          page={pageNumber}
          onPageChange={handlePageChange}
          onOrderChange={handleOrderChange}
          onRowClick={handleRowClick}
          order={order}
          totalCount={totalCount}
          columns={usersTableColumns}
          isLoading={isLoading}
          data={tableData}
          options={{
            paginationType: 'stepped',
            pageSize,
            showTitle: false,
            search: false,
            sorting: true,
            toolbar: false,
            draggable: false,
            thirdSortClick: false,
            rowStyle: {
              color: theme.palette.mode === ThemeEnum.LIGHT ? theme.palette.common.black : theme.palette.common.white,
            },
          }}
        />
      )}

      <UserEditFormPartial
        onSuccess={handleDrawerFormSuccess}
        open={Boolean(overlay)}
        onClose={handleOverlayClose}
        userId={selectedUserId}
      />

      {userIsUpdated && (
        <FormAlert
          data-cy="user-table-user-updated-alert"
          open
          message={t('user-updated-successfully')}
          onClose={() => setUserIsUpdated(false)}
        />
      )}
    </>
  );
};
