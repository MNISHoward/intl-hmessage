type Plugin = {
  getCurrentLang: () => string;
  listen: (cb: Plugin['getCurrentLang']) => void;
};

export default class Lang {
  private _currentLang = null;
  private _default = null;
  private _updateMeta = () => null;

  static plugin: Plugin = {
    getCurrentLang: () => null,
    listen: (updateLang: Lang['updateLang']) => null,
  };

  constructor(defaultLang?: string) {
    this._default = defaultLang;
    Lang.plugin.listen(Lang.plugin.getCurrentLang);
    this.updateLang(Lang.plugin.getCurrentLang());
  }

  updateLang(lang: string) {
    this._currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    this._updateMeta();
  }

  getLang() {
    return this._currentLang || this._default;
  }

  setUpdateMeta(updateMeta: () => void) {
    this._updateMeta = updateMeta;
  }
}
