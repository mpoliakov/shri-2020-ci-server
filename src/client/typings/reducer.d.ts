declare type BuildLog = string | null | undefined | '';

declare interface BuildState {
  build: BuildEntity | null;
  log: BuildLog;
}

declare interface BuildsState {
  builds: Array<BuildEntity>;
}

declare type ErrorMessage = string | null | undefined | '';

declare interface SettingsState {
  settings: SettingsEntity | null;
  loaded: boolean;
  loading: boolean;
  error: ErrorMessage;
}

