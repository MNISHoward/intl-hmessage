import IntlMessageFormat from "intl-messageformat";
import Lang from "./lang";

type ConfigType = {
  [key: string]: object;
};

export default class Message {
  private _metas = {};
  private _currentMeta = {};
  private _lang: Lang = null;
  private _createElement = null;

  constructor(config: ConfigType, lang: Lang, createElement?: unknown) {
    this._metas = config.metas;
    this._lang = lang;
    this._lang.setUpdateMeta(this.updateMeta);
    this._createElement = createElement;
    this.updateMeta();
  }

  updateMeta() {
    const lang = this._lang.getLang();
    document.documentElement.setAttribute("lang", lang);
    this._currentMeta = this._metas[lang];
    if (
      (this._currentMeta === null || this._currentMeta === undefined) &&
      lang.includes("-")
    ) {
      const backupLang = lang.split("-")[0];
      this._currentMeta = this._metas[backupLang];
    }
  }

  get(str, args?) {
    let msg = this._currentMeta?.[str];
    if (msg === null || msg === undefined) {
      console.warn(
        `Can not find the translate by ${str}, current language is ${this._lang.getLang()}`
      );
      return "";
    }
    if (args) {
      try {
        const message = new IntlMessageFormat(msg, this._lang.getLang());
        msg = message.format(args);
        return msg;
      } catch (err) {
        console.warn(`Format the translate failed`, err);
        return "";
      }
    }
    return msg;
  }

  getHtml(str, args?) {
    const msg = this.get(str, args);
    if (msg) {
      if (typeof this._createElement !== "function") {
        console.warn(
          "Please set createElement parameter by constructor and it must be a function"
        );
        return;
      }
      const el = this._createElement("span", {
        dangerouslySetInnerHTML: {
          __html: msg,
        },
      });
      const defaultMessage = () => el;
      return { defaultMessage, d: defaultMessage, ...el };
    }
    return msg;
  }
}
