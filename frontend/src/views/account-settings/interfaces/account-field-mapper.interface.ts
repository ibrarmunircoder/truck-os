export interface AccountFieldMapperInterface {
  getter: (account) => string | boolean;
  label: string;
  href?: (account) => string | null;
}
