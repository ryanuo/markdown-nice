export default (md: any) => {
  md.core.ruler.push('replace-li', () => {
    md.renderer.rules.list_item_open = () => '<li><section>'
    md.renderer.rules.list_item_close = () => '</section></li>'
  })
}
