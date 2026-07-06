import { diff_match_patch as DiffMatchPath } from 'diff-match-patch'
import * as React from 'react'

import './localHistory.css'

function NOOP() {}
const prefix = 'nice-md-local-history'

const diff = new DiffMatchPath()

class LocalHistory extends React.Component {
  constructor(props) {
    super(props)
    const { documents } = this.props
    this.state = {
      content: documents[0].Content,
      selectedKeys: String(documents[0].id),
      mode: 'all',
    }
  }

  getDiffHtml = () => {
    const a = diff.diff_linesToChars_(this.state.content, this.props.content)
    const lineText1 = a.chars1
    const lineText2 = a.chars2
    const diffs = diff.diff_main(lineText1, lineText2, false)

    diff.diff_charsToLines_(diffs, a.lineArray)
    const html = diff
      .diff_prettyHtml(diffs)
      .replace(/&para;/g, '')
      .replace(/<br>/g, '&#8203;<br>&#8203;')
    return html
  }

  selectNav = ({ selectedKeys }) => {
    const { Content: content } = this.props.documents.find(doc => String(doc.id) === String(selectedKeys[0])) || {}
    this.setState({
      content,
      selectedKeys,
    })
  }

  handleModeChange = (e) => {
    this.setState({
      mode: e.target.value,
    })
  }

  render() {
    const { documents } = this.props

    return (
      <>
        <Menu className={`${prefix}-nav`} onSelect={this.selectNav} selectedKeys={this.state.selectedKeys}>
          {documents.map(d => (
            <Menu.Item key={d.id}>{d.SaveTime.toLocaleString()}</Menu.Item>
          ))}
        </Menu>
        {this.state.content && (
          <div className={`${prefix}-preview`}>
            {this.state.mode === 'all'
              ? (
                  <CodeMirror
                    key="local-history"
                    value={this.state.content}
                    height="calc(100% - 56px)"
                    options={{
                      readOnly: true,
                      theme: 'md-mirror',
                      mode: 'markdown',
                      lineWrapping: true,
                      lineNumbers: false,
                    }}
                  />
                )
              : (
                  <div dangerouslySetInnerHTML={{ __html: this.getDiffHtml() }} className={`${prefix}-diff-content`} />
                )}
            <div className={`${prefix}-btn-group`}>
              <Radio.Group onChange={this.handleModeChange} value={this.state.mode}>
                <Radio value="all">全文</Radio>
                <Radio value="diff">和当前内容对比</Radio>
              </Radio.Group>
              <div>
                <Button onClick={this.props.onCancel}>取消</Button>
                <Button
                  id="nice-local-history-review"
                  type="primary"
                  onClick={() => {
                    this.props.onEdit(this.state.content)
                  }}
                >
                  恢复此版本
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}

LocalHistory.defaultProps = {
  visible: false,
  document: [{}],
  onEdit: NOOP,
  onCancel: NOOP,
}

export default LocalHistory
