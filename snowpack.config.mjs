/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    // directory name: 'build directory'
    public: '/',
    src: '/dist'
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    'snowpack-plugin-optimize',
      // Entirely optional object. Showing default values
      {
        // Turn JS minification with Terser on/off
        minifyJs?: true
        // A deep merge is performed with these defaults.
        // @see Terser configuration https://github.com/terser/terser#minify-options-structure
        jsOptions?: {
          module: true,
          toplevel: true,
          sourceMap: true,
          nameCache,
          compress: {
            ecma: 2019,
          },
          format: {
            ecma: 2019,
          },
        },
        // Adds modulepreload links to potentially improve your module dependency load times
        modulePreload?: true,
        minifyCss?: true,
        // A merge is performed with these default
        // @see CSSO configuration https://github.com/css/csso#minifysource-options
        cssOptions?: {
          sourceMap: true,
          filename: path.basename(file),
        },
        minifyHtml?: true,
        // A merge is performed with these defaults
        // @see html-minifier configuration https://github.com/kangax/html-minifier#options-quick-reference
        htmlOptions?: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
        },
      }
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
