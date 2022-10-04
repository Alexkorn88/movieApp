import { Col, Row } from "antd";
import React from "react";
import MovieCard from "../movieCard/movieCard";

function Rated() {
  const itemsStorage = JSON.parse(localStorage.getItem("items"));
  if (itemsStorage) {
    const elements = itemsStorage.map((item) => {
      const { id, ...itemProps } = item;
      return (
        <Col key={id} span={12}>
          <MovieCard {...itemProps} id={id} item={item} />
        </Col>
      );
    });
    return <Row gutter={[16, 16]}>{elements}</Row>;
  }
}

export default Rated;
