let env = 'production';  // local, production

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
  let domain = 'https://calculator.ellasoft.com';
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


