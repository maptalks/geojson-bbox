import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'index.js',
    output: {
      name: 'bbox',
      file: pkg.browser,
      format: 'umd'
    }
  },
  {
    input: 'index.js',
    output: [
      { file: pkg.main, format: 'cjs', exports: 'default' },
      { file: pkg.module, format: 'es' }
    ]
  }
];
