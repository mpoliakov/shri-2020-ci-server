declare interface SettingsRequest {
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
}

declare interface SettingsEntity {
  id: string;
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
}

declare interface BuildRequest {
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
}

declare type BuildStatus = 'Waiting' | 'InProgress' | 'Success' | 'Fail' | 'Canceled';

declare interface BuildEntityBase {
  id: string;
  buildNumber: number;
  status: BuildStatus;
}

declare interface BuildEntity extends BuildEntityBase {
  configurationId: string;
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
  start: Date;
  duration: number;
}

declare interface StartBuildRequest {
  buildId: string;
  dateTime: Date;
}

declare interface FinishBuildRequest {
  buildId: string;
  duration: number;
  success: boolean;
  buildLog: string;
}
