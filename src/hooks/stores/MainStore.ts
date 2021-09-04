import { makeAutoObservable } from 'mobx';
import { SiderTheme } from 'antd/lib/layout/Sider';

import { CONFIG } from 'common/enums';

class MainStore {
  public theme: SiderTheme;
  public sharedLoading: boolean;

  constructor() {
    makeAutoObservable(this);
    this.theme = CONFIG.theme;
    this.sharedLoading = false;
  }

  public setSharedLoading = (isLoading: boolean): void => {
    this.sharedLoading = isLoading;
  };
}

export default MainStore;
