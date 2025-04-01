/**
 *
 * Based on the script proposed by https://github.com/coder0107git
 * https://github.com/gleam-lang/gleam-highlight.js/pull/6
 *
 * Packages gleam-highlight.js to CDN ready minified bundles.
 *
 */

import * as esbuild from 'esbuild'
import fs from 'node:fs'

function stripIndentation (text) {
  return text.replace(/\n|\s{2}/g, '')
}

const rawBuildResult = await esbuild.build({
  entryPoints: ['index.js'],
  bundle: true,
  minify: true,
  target: 'es6',
  format: 'iife',
  globalName: 'hljsGleamGrammar',
  write: false
})

const bundledText = rawBuildResult.outputFiles?.[0].text

// ESM
fs.writeFileSync(
  './dist/gleam.es.min.js',
  stripIndentation(
    `${bundledText}
    export default hljsGleamGrammar`
  )
)

// IIFE
fs.writeFileSync(
  './dist/gleam.min.js',
  stripIndentation(
    `(()=>{
      ${bundledText}
      hljs.registerLanguage('gleam',hljsGleamGrammar)
    })()`
  )
)
