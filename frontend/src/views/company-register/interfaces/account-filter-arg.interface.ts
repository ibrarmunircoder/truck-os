type StringFilterArgType = {
  equalTo?: string;
  iLike?: string;
  like?: string;
  notEqualTo?: string;
  valueIn?: [string];
  valueNotIn?: [string];
};

export interface AccountFilterArgInterface {
  registrationNumber?: StringFilterArgType;
  registrationAuthority?: StringFilterArgType;
  iban?: StringFilterArgType;
  userId?: StringFilterArgType;
}
