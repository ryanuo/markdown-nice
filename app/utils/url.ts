// @env browser
export function queryParse(search = window.location.search) {
  if (!search)
    return {}
  const queryString = search.startsWith('?') ? search.substring(1) : search
  const query: Record<string, string> = {}
  queryString.split('&').forEach((queryStr) => {
    const [key, value] = queryStr.split('=')
    if (key)
      query[decodeURIComponent(key)] = decodeURIComponent(value ?? '')
  })
  return query
}

export function transCode(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)))
}

export function deCode(str: string) {
  return decodeURIComponent(escape(window.atob(str)))
}
