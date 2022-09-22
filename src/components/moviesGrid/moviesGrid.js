import { Col, Row } from "antd";
import React from "react";
import MovieCard from "../movieCard/movieCard";

function MoviesGrid({ items, loading, error, label }) {
  const elements = items.map((item) => {
    const { id, ...itemProps } = item;
    //console.log(id);
    return (
      <Col key={id} span={12}>
        <MovieCard
          {...itemProps}
          items={items}
          loading={loading}
          error={error}
        />
      </Col>
    );
  });
  return <Row gutter={[16, 16]}>{elements}</Row>;
}
export default MoviesGrid;
