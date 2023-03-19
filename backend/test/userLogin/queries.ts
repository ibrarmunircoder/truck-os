import { FileStatusEnum } from 'src/platformClient/platformSpaceClient/enums';

export const saveAvatarCompleteMutation = (fileSize: number | string = 12312312342): string => `
  mutation {
    updateUserAvatar(
      data: {
        fileName: "filename"
        fileType: "image/jpeg"
        customMetaData: { userId: "06a1c7ac-41e6-4a4f-a16b-46c185c51c9d"}
      }
      ) {
        id
        uploadUrl
    }
  }`;

export const saveAvatarWithoutRequiredMutation = `
  mutation {
    updateUserAvatar(
      data: {
        customMetaData: { userId: "06a1c7ac-41e6-4a4f-a16b-46c185c51c9d"}
        }
      ) {
        id
      }
    }`;

export const updateAvatarStatusMutation = (status: FileStatusEnum | string): string => `
  mutation{
    updateUserAvatarStatus(fileId: "0bdcdaad-44f2-48f5-863e-b2a3ac82b46e", status: ${status}){
      id
      status
    }
  }`;

export const userAvatarQuery = `
  query {
    users{
      data{
        id
        avatar
        roqIdentifier
      }
    }
  }`;

export const saveUserFile = (): string => `
  mutation {
    saveUserFile(
      data: {
        fileName: "randomfile"
        fileType: "image/jpeg"
      }
      ) {
        id
        uploadUrl
        status
    }
  }`;

export const saveUserFileWithoutArgs = (): string => `
  mutation {
    saveUserFile(
      data: {
        customMetaData: { userId: "06a1c7ac-41e6-4a4f-a16b-46c185c51c9d"}
        }
      ) {
        id
      }
    }`;
