export default (md: any) => {
  const oldFence = md.renderer.rules.fence
  md.renderer.rules.fence = (tokens: any, idx: number, options: any, env: any, slf: any) => {
    const old = oldFence(tokens, idx, options, env, slf)
    const preReg = /<pre><code[\w\s-="]*>/
    if (preReg.exec(old)) {
      return old.replace(preReg, '').replace('</code></pre>', '')
    }
    return old
  }
}
