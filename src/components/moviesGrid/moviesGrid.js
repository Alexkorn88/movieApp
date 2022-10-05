import { Col, Row } from "antd";
import React from "react";
import MovieCard from "../movieCard/movieCard";

function MoviesGrid({ items, loading, error }) {
  const elements = items.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <Col key={id} span={12}>
        <MovieCard
          {...itemProps}
          id={id}
          items={items}
          loading={loading}
          error={error}
          item={item}
        />
      </Col>
    );
  });
  return <Row gutter={[16, 16]}>{elements}</Row>;
}
export default MoviesGrid;
