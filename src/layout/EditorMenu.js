import { Component } from 'react'

import './EditorMenu.css'

class EditorMenu extends Component {
  render() {
    return (
      <Menu id="nice-editor-menu" className="nice-editor-menu">
        <Menu.Item className="ant-dropdown-menu-item">
          <LinkToFoot />
        </Menu.Item>
        <Menu.Item className="ant-dropdown-menu-item">
          <Format />
        </Menu.Item>
        <Menu.Item className="ant-dropdown-menu-item">
          <Image />
        </Menu.Item>
      </Menu>
    )
  }
}

export default EditorMenu
