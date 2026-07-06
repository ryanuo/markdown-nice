// Tree-shaken highlight.js v11. Imports only the languages we use, cutting the bundle ~900KB → ~90KB.
// Note: hljs v11 renamed "cs" → "csharp" (alias removed from core).
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import clojure from 'highlight.js/lib/languages/clojure'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import css from 'highlight.js/lib/languages/css'
import dart from 'highlight.js/lib/languages/dart'
import diff from 'highlight.js/lib/languages/diff'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import erlang from 'highlight.js/lib/languages/erlang'
import go from 'highlight.js/lib/languages/go'
import gradle from 'highlight.js/lib/languages/gradle'
import groovy from 'highlight.js/lib/languages/groovy'
import haskell from 'highlight.js/lib/languages/haskell'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import julia from 'highlight.js/lib/languages/julia'
import kotlin from 'highlight.js/lib/languages/kotlin'
import latex from 'highlight.js/lib/languages/latex'
import lisp from 'highlight.js/lib/languages/lisp'
import lua from 'highlight.js/lib/languages/lua'
import makefile from 'highlight.js/lib/languages/makefile'
import markdown from 'highlight.js/lib/languages/markdown'
import matlab from 'highlight.js/lib/languages/matlab'
import objectivec from 'highlight.js/lib/languages/objectivec'
import perl from 'highlight.js/lib/languages/perl'
import php from 'highlight.js/lib/languages/php'
import python from 'highlight.js/lib/languages/python'
import r from 'highlight.js/lib/languages/r'
import ruby from 'highlight.js/lib/languages/ruby'
import rust from 'highlight.js/lib/languages/rust'
import scala from 'highlight.js/lib/languages/scala'
import shell from 'highlight.js/lib/languages/shell'
import sql from 'highlight.js/lib/languages/sql'
import swift from 'highlight.js/lib/languages/swift'
import typescript from 'highlight.js/lib/languages/typescript'
import verilog from 'highlight.js/lib/languages/verilog'
import vhdl from 'highlight.js/lib/languages/vhdl'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'

const langs: Record<string, any> = {
  bash,
  clojure,
  cpp,
  csharp,
  css,
  dart,
  dockerfile,
  erlang,
  go,
  gradle,
  groovy,
  haskell,
  java,
  javascript,
  json,
  julia,
  kotlin,
  lisp,
  lua,
  makefile,
  markdown,
  matlab,
  objectivec,
  perl,
  php,
  python,
  r,
  ruby,
  rust,
  scala,
  shell,
  sql,
  swift,
  latex,
  typescript,
  verilog,
  vhdl,
  xml,
  yaml,
  diff,
}
for (const k of Object.keys(langs)) hljs.registerLanguage(k, langs[k])

export default hljs
