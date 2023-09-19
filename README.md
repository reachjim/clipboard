# New Project

> ✨ Bootstrapped with Create Snowpack App (CSA).

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.mjs` config file.

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.

# 技术栈
1. [snowpace react](https://www.snowpack.dev/tutorials/react)
2. [janus](http://wfeii.com/2021/04/12/WebRTC-Janus.html)
3. snowpack的webpack插件如何配置
> 
   请注意，Snowpack的Webpack插件（@snowpack/plugin-webpack）已在2022年被弃用，因为Snowpack v3.0之后已经完全迁移到了Snowpack自身的构建系统。现在，Snowpack使用ESBuild作为默认的构建工具，而不是Webpack。如果您使用的是Snowpack v3.0或更高版本，不需要配置@snowpack/plugin-webpack。您只需使用Snowpack的配置文件snowpack.config.js来指定项目的入口文件、输出目录、插件等。

4. [react.lazy](https://web.dev/code-splitting-suspense/)
5. [react prefetching](https://medium.com/@anokyy/the-easiest-way-to-prefetch-links-and-fix-fetch-waterfalls-in-react-query-useswr-apollo-client-or-33ae59409bf4)
6. [react quicklink](https://web.dev/quicklink/)
7. [prefetch](https://web.dev/preconnect-and-dns-prefetch/)
8. (https://developer.chrome.com/docs/devtools/network/reference/?utm_source=devtools#timing-explanation)
9. 测试网站 
   https://pagespeed.web.dev/analysis/https-online-cpcpcbcb-xyz/hd4v59oalx?form_factor=mobile
10. css颜色
   https://materialui.co/htmlcolors
11. 带按钮的editor https://codesandbox.io/s/draftjs-elzxnm?file=/src/App.tsx:861-879
