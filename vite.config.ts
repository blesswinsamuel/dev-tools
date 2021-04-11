import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import nodeResolve from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import inject from '@rollup/plugin-inject'
import replace from '@rollup/plugin-replace'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   commonjsOptions: {
  //     requireReturnsDefault: (id) => {
  //       throw new Error(id)
  //       return true
  //     },
  //   },
  // },
  // esbuild: {

  // },
  plugins: [
    // commonjs({
    //   requireReturnsDefault: (id) => {
    //     throw new Error(id)
    //     return true
    //   },
    //   esmExternals: () => {

    //   }
    // }),
    // alias({
    //   entries: {
    //     stream: require.resolve('readable-stream'),
    //   },
    // }),
    // nodeResolve({
    //   modulesOnly: true,
    //   browser: true,
    // }),

    reactRefresh(),
    // inject({
    //   Buffer: ['buffer', 'Buffer'], // https://github.com/rollup/plugins/tree/master/packages/inject
    // }),
    nodePolyfills({
      // include: ['buffer'],
    }),
    nodeResolve({ preferBuiltins: false, browser: true }),
    replace({
      // include: ['node_modules/avsc/etc/browser/avsc.js'], // node_modules/avsc/etc/browser/avsc.js
      values: {
        // 'process.env.DEBUG': undefined,
        // 'process.env.READABLE_STREAM': JSON.stringify('disable'),
        "require('stream')": 'require("stream").default',
      },
      preventAssignment: false,
    }),
    // alias({
    //   entries: [
    //     { find: 'stream', replacement: 'readable-stream' },
    //     // { find: 'batman-1.0.0', replacement: './joker-1.5.0' }
    //   ],
    // }),
  ],
  // build: {
  //   rollupOptions: {
  //     plugins: [
  //       inject({
  //         Promise: ['buffer', 'Buffer'], // https://github.com/rollup/plugins/tree/master/packages/inject
  //       }),
  //     ],
  //   },
  // },
  define: {
    'process.env.DEBUG': undefined,
    // 'process.env.READABLE_STREAM': JSON.stringify('enable'),
  },
  // resolve: {
  //   alias: {
  //     buffer: require.resolve('buffer/'),
  //     stream: require.resolve('./readable-stream.js'),
  //   },
  // },
})
