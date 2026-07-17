import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import classnames from "classnames";

import Cover from "../component/MenuLeft/Cover";
import File from "../component/MenuLeft/File";
import Help from "../component/MenuLeft/Help";
import Pattern from "../component/MenuLeft/Pattern";
import Function from "../component/MenuLeft/Function";
import Theme from "../component/MenuLeft/Theme";
import CodeTheme from "../component/MenuLeft/CodeTheme";
import Setting from "../component/MenuLeft/Setting";
import View from "../component/MenuLeft/View";

import "./Navbar.css";

// @inject("userInfo")
@inject("view")
@observer
class Navbar extends Component {
  render() {
    const {title} = this.props;
    const {isImmersiveEditing} = this.props.view;
    const niceNavbarClass = classnames({
      "nice-navbar": true,
      "nice-navbar-hide": isImmersiveEditing,
    });
    return (
      <div className={niceNavbarClass}>
        <div className="nice-left-nav">
          <img src="/logo.png" alt="Inkwell" className="nice-logo" />
          {title === "" ? null : (
            <section id="nice-title" className="nice-title">
              {title}
            </section>
          )}
          <Cover />
          <File />
          <Pattern />
          <Function />
          <View />
          <Theme />
          <CodeTheme />
          <Setting />
          <Help />
        </div>
        <div className="nice-right-nav" />
      </div>
    );
  }
}

export default Navbar;
