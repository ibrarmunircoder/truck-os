import EditIcon from '@mui/icons-material/EditOutlined';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Property } from 'csstype';
import { ActionOverlay } from 'modules/action-overlay/components/action-overlay';
import { ActionOverlayProps } from 'modules/action-overlay/components/action-overlay/action-overlay.component';
import { ActionOverlayButtons } from 'modules/action-overlay/components/action-overlay-buttons';
import { useAuth } from 'modules/auth/hooks';
import { LoadingSkeleton, RoqLink, Table, TableColumnInterface } from 'modules/common/components';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { FormattedDate } from 'modules/date-time/components';
import { UserInviteStatusEnum } from 'modules/user-invites/enums';
import { UserInviteInterface } from 'modules/user-invites/interfaces';
import { singleUserInviteSelector } from 'modules/user-invites/selectors';
import { UserStatus } from 'modules/users/components';
import { UserTableToggleButtonGroupEnum } from 'modules/users/components/user-table-toggle-button-group/user-table-toggle-button-group.component';
import React, { FunctionComponent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEditUserInvite, useUserInvitesTable } from 'views/users/hooks';
import { UserInviteEditFormPartial } from 'views/users/partials';
import { useUserInvitesTableStyles } from 'views/users/tables/user-invites.table.styles';

interface UserInvitesTablePartialInterface {
  userFilter: UserTableToggleButtonGroupEnum;
}

interface UserInviteEditFormActionOverlayInterface extends ActionOverlayProps<null> {
  inviteId: string;
}

const UserInviteEditFormActionOverlay: FunctionComponent<UserInviteEditFormActionOverlayInterface> = (props) => {
  const { t } = useTranslation();
  const { userInvite } = useEditUserInvite(props.inviteId);

  if (!userInvite) {
    return null;
  }

  return (
    <ActionOverlay
      config={{
        title: t('title_edit-user-invite'),
      }}
      {...props}
    >
      <Grid container direction="column" justifyContent="space-between" alignItems="stretch" height="100%">
        <Grid item flexGrow={2}>
          <UserInviteEditFormPartial userInvite={userInvite} />
        </Grid>

        <Grid item flexShrink={1}>
          <ActionOverlayButtons onCancel={props.onClose} displaySubmitButton={false} />
        </Grid>
      </Grid>
    </ActionOverlay>
  );
};

export const UserInvitesTable: FunctionComponent<UserInvitesTablePartialInterface> = (props) => {
  const { userFilter } = props;
  const router = useRouter();
  const { previousEditedUserInvite } = useSelector(singleUserInviteSelector);
  const classes = useUserInvitesTableStyles();
  const { user: authUser } = useAuth();
  const { t } = useTranslation();
  const [overlay, setOverlay] = useState(null);
  const [selectedUserInviteId, setSelectedUserInviteId] = useState(null);
  const { isLoading, order, userInvites, totalCount, pageNumber, pageSize, handlePageChange, handleOrderChange } =
    useUserInvitesTable(userFilter, selectedUserInviteId);

  const columns: TableColumnInterface<UserInviteInterface>[] = useMemo(
    () => [
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
        render: (rowData: UserInviteInterface) => (
          <RoqLink href={`mailto:${rowData.email}`}>
            <a className={classes.emailLink}>{rowData.email}</a>
          </RoqLink>
        ),
      },
      {
        title: t('created-at'),
        field: 'createdAt',
        render: (rowData: UserInviteInterface) => (
          <FormattedDate date={rowData.createdAt} timezone={authUser.timezone} twoLines />
        ),
      },
      {
        title: t('invitation-status'),
        field: 'status',
        render: (rowData: UserInviteInterface) => <UserStatus status={rowData.status} />,
      },
      {
        title: t('action'),
        sorting: false,
        cellStyle: { width: '1%', whiteSpace: 'nowrap' as Property.WhiteSpace },
        render: (rowData: UserInviteInterface) => (
          <Grid container wrap="nowrap">
            <IconButton
              data-cy="user-invites-table-edit-btn"
              onClick={() => {
                setSelectedUserInviteId(rowData.id);
                setOverlay('open');
              }}
              className={classes.tableIcon}
            >
              <EditIcon />
            </IconButton>
          </Grid>
        ),
      },
    ],
    [classes, t],
  );

  const tableData = useMemo(
    () =>
      userInvites
        .map((user) => ({ ...user }))
        .filter((user) => {
          if (userFilter === UserTableToggleButtonGroupEnum.INVITED) {
            return [UserInviteStatusEnum.ACCEPTED, UserInviteStatusEnum.PENDING, UserInviteStatusEnum.EXPIRED].includes(
              user.status,
            );
          }

          if (userFilter === UserTableToggleButtonGroupEnum.CANCELED) {
            return user.status === UserInviteStatusEnum.CANCELED;
          }

          return false;
        }),
    [userInvites, userFilter],
  );

  const handleOverlayClose = () => {
    if (previousEditedUserInvite === null) {
      setOverlay(null);
      setSelectedUserInviteId(null);
      return false;
    }

    if (previousEditedUserInvite !== null) {
      return router.reload();
    }
  };
  const handleDrawerFormSuccess = () => {
    handleOverlayClose();
  };

  return (
    <>
      {isLoading && <LoadingSkeleton />}

      {!isLoading && (
        <Table
          page={pageNumber}
          onPageChange={handlePageChange}
          onOrderChange={handleOrderChange}
          order={order}
          totalCount={totalCount}
          columns={columns}
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
          }}
        />
      )}

      <UserInviteEditFormActionOverlay
        open={Boolean(overlay)}
        onClose={handleOverlayClose}
        onSuccess={handleDrawerFormSuccess}
        inviteId={selectedUserInviteId}
      />
    </>
  );
};
