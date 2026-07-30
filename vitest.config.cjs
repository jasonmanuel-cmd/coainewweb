const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    include: ['__tests__/**/*.test.ts', '__tests__/**/*.test.tsx'],
    exclude: ['node_modules/**', '.next/**', '.claude/**'],
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['lib/**/*.ts'],
      exclude: ['lib/supabase/**', 'lib/analytics/**']
    }
  },
  resolve: {
    alias: {
      '@': __dirname
    }
  }
});
