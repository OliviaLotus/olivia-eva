import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  unocss: true,
  typescript: {
    overrides: {
      'no-restricted-syntax': 'off',
    },
  },
})
