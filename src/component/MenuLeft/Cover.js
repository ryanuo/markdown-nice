import React, {Component} from "react";
import {Modal} from "antd";
import {observer, inject} from "mobx-react";

import "./common.css";

@inject("content")
@observer
class Cover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.iframeRef = React.createRef();
  }

  showModal = () => {
    this.setState({visible: true});
  };

  handleIframeLoad = () => {
    this.sendContentToIframe();
  };

  sendContentToIframe = () => {
    const iframe = this.iframeRef.current;
    if (!iframe) return;

    const {content} = this.props.content;

    // 从 markdown 提取标题（第一个 # heading）
    let mdTitle = "";
    let mdSubtitle = "";

    if (content) {
      const lines = content.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/^#\s+(.+)/);
        if (m) {
          mdTitle = m[1].trim();
          // 找下一个非空非标题行作为副标题
          for (let j = i + 1; j < lines.length; j++) {
            const next = lines[j].trim();
            if (next && !next.startsWith("#")) {
              mdSubtitle = next.replace(/^>\s*/, "").trim();
              break;
            }
          }
          break;
        }
      }
    }

    iframe.contentWindow.postMessage({type: "setContent", title: mdTitle, subtitle: mdSubtitle}, "*");
  };

  handleCancel = () => {
    this.setState({visible: false});
  };

  render() {
    const {visible} = this.state;
    return (
      <>
        <a
          id="nice-menu-cover"
          className="nice-menu-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            this.showModal();
          }}
        >
          封面
        </a>
        <Modal
          title="封面生成器"
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
          width="90vw"
          bodyStyle={{
            padding: 0,
            height: "calc(90vh - 55px)",
          }}
          style={{
            top: "55px",
          }}
          destroyOnClose
        >
          <iframe
            ref={this.iframeRef}
            title="cover-generator"
            src="/cover.html"
            onLoad={this.handleIframeLoad}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </Modal>
      </>
    );
  }
}

export default Cover;
