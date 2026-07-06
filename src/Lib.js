import PropTypes from 'prop-types'
import { Component } from 'react'

import content from './store/content'
import dialog from './store/dialog'
import imageHosting from './store/imageHosting'
import navbar from './store/navbar'
import userInfo from './store/userInfo'
import view from './store/view'

import { LAYOUT_ID } from './utils/constant'
import { solveHtml, solveWeChatMath, solveZhihuMath } from './utils/converter'
import { isPC } from './utils/helper'
import './index.css'

class Lib extends Component {
  getWeChatHtml() {
    const layout = document.getElementById(LAYOUT_ID) // 保护现场
    const html = layout.innerHTML
    solveWeChatMath()
    const res = solveHtml()
    layout.innerHTML = html // 恢复现场
    return res
  }

  getZhihuHtml() {
    const layout = document.getElementById(LAYOUT_ID) // 保护现场
    const html = layout.innerHTML
    solveZhihuMath()
    const res = solveHtml()
    layout.innerHTML = html // 恢复现场
    return res
  }

  render() {
    const { defaultTitle, defaultText, onTextChange, useImageHosting } = this.props
    const appCtx = {
      defaultTitle,
      useImageHosting,
    }
    return (
      <Provider
        content={content}
        userInfo={userInfo}
        navbar={navbar}
        dialog={dialog}
        imageHosting={imageHosting}
        view={view}
      >
        {isPC()
          ? (
              <appContext.Provider value={appCtx}>
                <App defaultText={defaultText} onTextChange={onTextChange} useImageHosting={useImageHosting} />
              </appContext.Provider>
            )
          : (
              <Result
                icon={<SvgIcon name="smile" style={style.svgIcon} />}
                title="请使用 PC 端打开排版工具"
                subTitle="更多 Markdown Nice 信息，请扫码关注公众号「编程如画」"
                extra={(
                  <img
                    alt=""
                    style={{ width: '100%' }}
                    src="https://imgkr.cn-bj.ufileos.com/22cf98bd-3f85-45fc-9df7-e6b2808329d0.png"
                  />
                )}
              />
            )}
      </Provider>
    )
  }
}

const style = {
  svgIcon: {
    width: '72px',
    height: '72px',
  },
}

Lib.defaultProps = {
  defaultTitle: '',
  defaultText: '',
  onTextChange: () => {},
  // eslint-disable-next-line react/default-props-match-prop-types
  useImageHosting: {
    url: '',
    name: '',
    isSmmsOpen: true,
    isQiniuyunOpen: true,
    isAliyunOpen: true,
  },
}
Lib.propTypes = {
  defaultTitle: PropTypes.string,
  defaultText: PropTypes.string,
  onTextChange: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  useImageHosting: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
    isSmmsOpen: PropTypes.bool,
    isQiniuyunOpen: PropTypes.bool,
    isAliyunOpen: PropTypes.bool,
  }),
}

export default Lib
