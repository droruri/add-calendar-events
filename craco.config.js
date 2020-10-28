const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@layout-header-background': '#2196F3',
              '@layout-header-color': '#fff',
              '@layout-header-padding': '0 15px',
              '@input-icon-color': '#fff',
              '@layout-body-background': '#fff',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
