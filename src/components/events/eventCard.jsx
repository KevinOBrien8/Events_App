import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const EventCard = ({ data }) => {
  const [message, setMessage] = useState("");
  const inputEmail = useRef();

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const eventId = router?.query.id;

    const emailValue = inputEmail.current.value;

    const validRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailValue.match(validRegex)) {
      setMessage("Please use a valid email address format");
    }

    try {
      //POST fetch request
      const res = await fetch("/api/email-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue, eventId }),
      });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setMessage(data.message);
      inputEmail.current.value = "";

      //body emailValue and eventID
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single_event">
      <h2>{data.title}</h2>
      <Image src={data.image} width={1000} height={500} alt={data.title} />

      <p>{data.description}</p>
      <form onSubmit={onSubmit} className="email_registration">
        <label>Register for this event!</label>
        <input
          ref={inputEmail}
          type="email"
          id="email"
          placeholder="email@address.com"
        />
        <button>Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default EventCard;
