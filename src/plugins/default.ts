const defaultPlugin = {
  getCurrentLang: () => navigator.language,
  listen(cb: (lang: string) => void) {
    window.onlanguagechange = () => {
      cb(defaultPlugin.getCurrentLang());
    };
  },
};

export default defaultPlugin;
