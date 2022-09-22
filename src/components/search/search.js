import { Input } from "antd";
import React from "react";
import { Component } from "react";
import SwapiService from "../servises/swapiServis";

export default class Search extends Component {
  swapiService = new SwapiService();
  render() {
    const { onLabelChange, label } = this.props;

    this.onSubmit = (e) => {
      e.preventDefault();
    };
    return (
      <form onSubmit={this.onSubmit}>
        <Input placeholder="Type to search..." onChange={onLabelChange} />
      </form>
    );
  }
}
