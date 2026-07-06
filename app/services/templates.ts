// Template strings imported as raw text via Vite.
// Each source file exports a default CSS/template string, so  captures it directly.

import basic from '../template/basic?raw'
import atomOneDark from '../template/code/atomOneDark?raw'
import atomOneLight from '../template/code/atomOneLight?raw'
import github from '../template/code/github?raw'
import monokai from '../template/code/monokai?raw'
import vs2015 from '../template/code/vs2015?raw'
import xcode from '../template/code/xcode?raw'
import content from '../template/content.md?raw'
import macAtomOneDark from '../template/macCode/macAtomOneDark?raw'
import macAtomOneLight from '../template/macCode/macAtomOneLight?raw'
import macGithub from '../template/macCode/macGithub?raw'
import macMonokai from '../template/macCode/macMonokai?raw'
import macVs2015 from '../template/macCode/macVs2015?raw'
import macXcode from '../template/macCode/macXcode?raw'
import blue from '../template/markdown/blue?raw'
import blueCyan from '../template/markdown/blueCyan?raw'
import blueMountain from '../template/markdown/blueMountain?raw'
import custom from '../template/markdown/custom?raw'
import cuteGreen from '../template/markdown/cuteGreen?raw'
import cyan from '../template/markdown/cyan?raw'
import extremeBlack from '../template/markdown/extremeBlack?raw'
import fullStackBlue from '../template/markdown/fullStackBlue?raw'

import geekBlack from '../template/markdown/geekBlack?raw'
import green from '../template/markdown/green?raw'
import ink from '../template/markdown/ink?raw'
import nightPurple from '../template/markdown/nightPurple?raw'
import normal from '../template/markdown/normal?raw'
import orangeHeart from '../template/markdown/orangeHeart?raw'

import purple from '../template/markdown/purple?raw'
import red from '../template/markdown/red?raw'
import rose from '../template/markdown/rose?raw'
import scienceBlue from '../template/markdown/scienceBlue?raw'
import shanchui from '../template/markdown/shanchui?raw'
import simple from '../template/markdown/simple?raw'

import wechatFormat from '../template/markdown/wechatFormat?raw'

export interface Templates {
  basic: string
  style: Record<string, string>
  code: Record<string, string>
  content: string
}

export const templates: Templates = {
  basic,
  style: {
    blue,
    blueMountain,
    blueCyan,
    normal,
    custom,
    cyan,
    geekBlack,
    green,
    ink,
    orangeHeart,
    purple,
    red,
    scienceBlue,
    shanchui,
    simple,
    wechatFormat,
    rose,
    cuteGreen,
    fullStackBlue,
    nightPurple,
    extremeBlack,
  },
  code: {
    atomOneDark,
    atomOneLight,
    github,
    monokai,
    vs2015,
    xcode,
    macAtomOneDark,
    macAtomOneLight,
    macGithub,
    macMonokai,
    macVs2015,
    macXcode,
  },
  content,
}
