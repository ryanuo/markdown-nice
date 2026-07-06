export default (props) => {
  switch (props.name) {
    case 'copy':
      return <Copy {...props} />
    case 'down':
      return <Down {...props} />
    case 'environment':
      return <Environment {...props} />
    case 'github':
      return <GitHub {...props} />
    case 'inbox':
      return <Inbox {...props} />
    case 'more':
      return <More {...props} />
    case 'rabbit':
      return <Rabbit {...props} />
    case 'smile':
      return <Smile {...props} />
    case 'pc':
      return <PC {...props} />
    case 'mobile':
      return <Mobile {...props} />
    case 'wechat':
      return <Wechat {...props} />
    case 'zhihu':
      return <Zhihu {...props} />
    case 'juejin':
      return <Juejin {...props} />
    case 'close':
      return <Close {...props} />
    case 'fontCase':
      return <FontCase {...props} />
    case 'replace':
      return <Replace {...props} />
    case 'replaceAll':
      return <ReplaceAll {...props} />
    default:
      return <svg />
  }
}
