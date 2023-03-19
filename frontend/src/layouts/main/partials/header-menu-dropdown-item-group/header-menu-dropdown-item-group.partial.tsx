import Divider from '@mui/material/Divider';
import { FunctionComponent, ReactNode } from 'react';

export type HeaderMenuDropdownItemGroupProps = {
  before?: boolean;
  after?: boolean;
  children: ReactNode;
}

export const HeaderMenuDropdownItemGroup: FunctionComponent<HeaderMenuDropdownItemGroupProps> = (props) => {
  const {
    before = true,
    after = true,
    children,
  } = props;

  const divider = (
    <li>
      <Divider sx={{ mx: 2 }}/>
    </li>
  )

  return (
    <>
      {before && divider}
      {children}
      {after && divider}
    </>
  );
};
