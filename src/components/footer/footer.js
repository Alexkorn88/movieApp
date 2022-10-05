import React, { Component } from "react";
import { Pagination } from "antd";

export default class Footer extends Component {
  render() {
    const { totalPages, handlePageClick, pagesCount } = this.props;
    return (
      <>
        {totalPages > 1 && (
          <Pagination
            centered
            defaultCurrent={1}
            size="default"
            showSizeChanger={false}
            total={totalPages}
            onChange={handlePageClick}
            current={pagesCount ? pagesCount : 1}
          />
        )}
      </>
    );
  }
}
