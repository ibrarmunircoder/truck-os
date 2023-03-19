import { DefaultTheme, makeStyles, Styles, WithStylesOptions } from '@mui/styles';
import get from 'lodash/get'
import has from 'lodash/has'
import set from 'lodash/set'
import { useMemo } from 'react';

export interface ClassesInterface {
  [name: string]: string | ClassesInterface;
}

const mergeClassesDeep = <C = ClassesInterface>(classes1: C, classes2: C): C => {
  if (!classes2) {
    return classes1;
  }
  if (!classes1) {
    return classes2;
  }
  if (typeof classes1 === 'string' || typeof classes2 === 'string') {
    if (typeof classes1 !== 'string' || typeof classes2 !== 'string') {
      throw new Error('Can\'t merge string with object. There is mismatch in your classes')
    }
    if (typeof classes1 === 'string' || typeof classes2 === 'string') {
      return `${classes1} ${classes2}` as unknown as C;
    }
  }
  return [...new Set(Object.keys(classes1).concat(Object.keys(classes2)))].reduce((result, key) => {
    if (!classes1[key]) {
      result[key] = classes2[key];
    } else if (!classes2[key]) {
      result[key] = classes1[key];
    } else {
      result[key] = mergeClassesDeep<unknown>(classes1[key], classes2[key])
    }
    return result
  }, {}) as C;
}

/**
 * hook enhances MUI makeStyles to make it possible to build nested classes objects based on dot separated field path
 */
export function roqMakeStyles<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Classes = { [name: string]: string },
  Theme = DefaultTheme,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Props extends { classes?: Classes } = {},
  ClassKey extends string = string,
>(
  styles: Styles<Theme, Props, ClassKey>,
  options?: Omit<WithStylesOptions<Theme>, 'withTheme'>,
): (props?: Props) => Classes {
  const useStyles = makeStyles(styles, options);

  const roqUseStyles = (props?: Props): Classes => {
    const { classes: propsClasses = {}, ...restProps } = props || {}
    const builtClasses = useStyles(restProps as Props);

    return useMemo(() => mergeClassesDeep<Classes>(
        Object.entries(builtClasses)
          .reduce((acc, [ key, value ]) => {
            const path = key.split('--').join('.');
            return set(acc, path, has(acc, path) ? `${get(acc, path)} ${value}` : value);
          }, {}) as Classes,
        propsClasses as Classes
      ),
      [ builtClasses, propsClasses || null ]
    );
  }

  return roqUseStyles;
}
