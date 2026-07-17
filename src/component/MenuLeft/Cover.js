import React, {Component} from "react";
import {Modal} from "antd";

import "./common.css";

class Cover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModal = () => {
    this.setState({visible: true});
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
            title="cover-generator"
            src="/cover.html"
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
