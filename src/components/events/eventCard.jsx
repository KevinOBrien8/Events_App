import React from "react";
import Image from "next/image";

const EventCard = ({ data }) => {
  return (
    <div>
      <h2>{data.title}</h2>
      <Image src={data.image} width={1000} height={500} alt={data.title} />

      <p>{data.description}</p>
    </div>
  );
};

export default EventCard;
