import { Component } from 'react'

import './common.css'

const menu = (
  <Menu>
    <Menu.Item>
      <Del />
    </Menu.Item>
    <Menu.Item>
      <Bold />
    </Menu.Item>
    <Menu.Item>
      <Italic />
    </Menu.Item>
    <Menu.Item>
      <Code />
    </Menu.Item>
    <Menu.Item>
      <InlineCode />
    </Menu.Item>

    <Menu.Divider />

    <Menu.Item>
      <Link />
    </Menu.Item>
    <Menu.Item>
      <Form />
    </Menu.Item>
    <Menu.Item>
      <Image />
    </Menu.Item>
    <Menu.Item>
      <Font />
    </Menu.Item>

    <Menu.Divider />

    <Menu.Item>
      <LinkToFoot />
    </Menu.Item>
    <Menu.Item>
      <Format />
    </Menu.Item>
  </Menu>
)

class Pattern extends Component {
  render() {
    return (
      <Dropdown overlay={menu} trigger={['click']} overlayClassName="nice-overlay">
        <a id="nice-menu-pattern" className="nice-menu-link" href="#">
          格式
        </a>
      </Dropdown>
    )
  }
}

export default Pattern
