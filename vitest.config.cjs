const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    include: ['__tests__/**/*.test.ts', '__tests__/**/*.test.tsx'],
    exclude: ['node_modules/**', '.next/**', '.claude/**'],
    environment: 'happy-dom',
    globals: true,
    // The API-route tests drive real HTTP requests through the route handlers. Under full
    // parallel load they were observed taking 13s and hitting Vitest's 5s default
    // per-test timeout, so a green suite turned red for reasons unrelated to the change
    // under test. 30s leaves headroom without hiding a genuine hang.
    testTimeout: 30000,
    // happy-dom environment setup is the dominant cost (it was 79% of wall time across 21
    // files). Sharing one instance per worker removes most of it.
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    },
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
