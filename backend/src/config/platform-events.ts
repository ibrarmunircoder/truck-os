export const platformEventSubscribers: {
  key: string;
  eventType: string;
  consumer: string;
  parameters?: Record<string, unknown>;
  api?: string;
  condition?: string;
}[] = [
  {
    eventType: 'ROQ_FILE_UPDATE',
    consumer: 'NotificationEventHandlerPlugin',
    parameters: {
      recipients: {
        currentUser: false,
        userGroupType: {
          allUsers: true,
          userGroupTypes: ['manager'],
          excludeCurrentUser: true,
          userGroupTypesWithUser: ['restaurant', 'country'],
        },
      },
      entityMapping: [
        {
          type: 'user',
          alias: 'creator',
          uuidPath: 'data.current.createdByUserId',
        },
      ],
      notificationType: 'files-new',
      excludedUserIdPaths: ['data.current.createdByUserId'],
      userIdPath: 'data.current.userId',
    },
    condition: 'current.status == "ready" && previous.status == "upload_pending"',
    key: 'ROQ_FILE_UPDATE_SEND_NOTIFICATION',
  },
  {
    key: 'USER_LOGIN_SYNC',
    eventType: 'USER_LOGIN_SYNC',
    consumer: 'UserSyncEventHandlerPlugin',
  },
];
