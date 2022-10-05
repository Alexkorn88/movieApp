/* eslint-disable react/no-unused-class-component-methods */
import { Input } from 'antd';
import React, { Component } from 'react';

import SwapiService from '../servises/swapiServis';

export default class Search extends Component {
  swapiService = new SwapiService();

  render() {
    const { onLabelChange } = this.props;

    return (
      <form>
        <Input placeholder="Type to search..." onChange={onLabelChange} />
      </form>
    );
  }
}
