let env = 'local';  // local, production

if (env === 'local') {
  let domain = 'https://creditcalculator.test';
  module.exports = {
    assetPrefix: '',
    output: 'export',
    env: {
      env: env,
      domain: domain,
      api: `${domain}/api`,
    },
    basePath: '',
    reactStrictMode: false,
    images: {
      domains: ['localhost/website'],
    },
  }
}else {
  let domain = 'https://demo.ellasoft.com';
  module.exports = {
    assetPrefix: '/resources/views/front',
    output: 'export',
    env: {
      env: env,
      domain: domain,
      api: `${domain}/api`,
    },
    basePath: '',
    reactStrictMode: false,
    images: {
      domains: ['localhost/website'],
    },
  }
}


