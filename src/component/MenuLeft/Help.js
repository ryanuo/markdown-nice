import { Component } from 'react'

import './common.css'

const menu = (
  <Menu>
    <Menu.Item>
      <About />
    </Menu.Item>
  </Menu>
)

class Help extends Component {
  render() {
    return (
      <Dropdown overlay={menu} trigger={['click']} overlayClassName="nice-overlay">
        <a id="nice-menu-help" className="nice-menu-link" href="#">
          帮助
        </a>
      </Dropdown>
    )
  }
}

export default Help
