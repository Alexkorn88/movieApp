import React from "react";
// import "antd/dist/antd.css";
// import "./index.css";
import { Tabs } from "antd";
import Search from "../search";
import { Component } from "react";

export default class Header extends Component {
  render() {
    const { onLabelChange, label, onChangeTab } = this.props;

    return (
      <Tabs
        defaultActiveKey="1"
        centered
        onChange={onChangeTab}
        items={[
          {
            label: "Search",
            key: "1",
            children: <Search onLabelChange={onLabelChange} label={label} />,
          },
          {
            label: "Rated",
            key: "2",
            children: "Tab 2",
          },
        ]}
      />
    );
  }
}
