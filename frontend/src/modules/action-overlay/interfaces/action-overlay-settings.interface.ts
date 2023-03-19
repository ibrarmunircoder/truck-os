import { ActionOverlayConfigurationInterface } from 'modules/action-overlay/interfaces/action-overlay-configuration.interface';

export interface ActionOverlaySettingsInterface<T> {
  config: ActionOverlayConfigurationInterface<T, unknown, unknown>;
  params: T | T[];
}
