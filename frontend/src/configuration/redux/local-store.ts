import { LayoutStateInterface } from 'modules/layout/layout.slice';
import { ThemeStateInterface } from 'modules/theme/theme.slice';

export interface StateInterface {
  theme: Record<string, ThemeStateInterface>;
  layout: Record<string, LayoutStateInterface>;
}

export const loadState = (): StateInterface | undefined => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState) {
      return JSON.parse(serializedState);
    }

    return undefined;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: StateInterface): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error(err);
  }
};
