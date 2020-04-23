import {AxiosInstance} from 'axios';
import {BackendApiRoutes} from '../const';

class BackendAPI {
  private readonly _api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this._api = api;
    this._api.interceptors.response.use((res) => {
      return res.data.data || res.data || res;
    });
  }

  async getSettings(): Promise<SettingsEntity | null> {
    const settings: SettingsEntity = await this._api.get(BackendApiRoutes.CONF);
    return (settings && settings.repoName) ? settings : null;
  }

  async saveSettings(settings: SettingsRequest) {
    await this._api.post(BackendApiRoutes.CONF, settings);
  }

  async deleteSettings() {
    await this._api.delete(BackendApiRoutes.CONF);
  }

  async getBuildList(offset = undefined, limit = 25): Promise<BuildEntity[]> {
    return await this._api.get(BackendApiRoutes.BUILD_LIST, {
      params: {
        offset,
        limit
      }
    });
  }

  async getBuild(buildId: string): Promise<BuildEntity> {
    return await this._api.get(BackendApiRoutes.BUILD_DETAILS, {
      params: {
        buildId
      }
    });
  }

  async getBuildLog(buildId: string): Promise<string> {
    return await this._api.get(BackendApiRoutes.BUILD_LOG, {
      params: {
        buildId
      }
    });
  }

  async requestBuild(request: BuildRequest): Promise<BuildEntityBase> {
    const res:BuildEntityBase = await this._api.post(BackendApiRoutes.BUILD_REQUEST, request);
    return res;
  }

  async startBuild(startInfo: StartBuildRequest) {
    await this._api.post(BackendApiRoutes.BUILD_START, startInfo);
  }

  async finishBuild(finishInfo: FinishBuildRequest) {
    await this._api.post(BackendApiRoutes.BUILD_FINISH, finishInfo);
  }

  async cancelBuild(buildId: string) {
    await this._api.post(BackendApiRoutes.BUILD_CANCEL, {
      buildId
    });
  }
}

export default BackendAPI;

