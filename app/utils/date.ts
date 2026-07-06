export function dateFormat(date: Date, fmt: string) {
  const o: Record<string, number> = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds(),
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const v = o[k]
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? `${v}` : `00${v}`.substr(`${v}`.length))
    }
  }
  return fmt
}

export function getOSSName(originName: string, namespace = '') {
  const names = originName.split('.')
  let key = ''
  if (names.length > 1) {
    const suffix = names.pop()!
    key = `${names.join('.')}_${dateFormat(new Date(), 'yyyyMMddhhmmss')}.${suffix}`
  }
  else {
    key = `${originName}_${dateFormat(new Date(), 'yyyyMMddhhmmss')}`
  }
  return `${namespace}${key}`
}
