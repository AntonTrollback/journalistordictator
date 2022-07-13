import { viteSingleFile } from 'vite-plugin-singlefile'
import { minify } from 'html-minifier-terser'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    minifyPlugin({
      collapseWhitespace: true,
      keepClosingSlash: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true
    }),
    viteSingleFile({ useRecommendedBuildConfig: false })
  ]
})

function minifyPlugin(opts) {
  return {
    name: 'vite:minify-html',
    enforce: 'post',
    async generateBundle(_, outBundle) {
      await Promise.all(
        Object.values(outBundle)
          .filter((bundle) => /\.html$/.test(bundle.fileName))
          .map(async function (bundle) {
            bundle.source = await minify(bundle.source, opts)
          })
      )
    }
  }
}
