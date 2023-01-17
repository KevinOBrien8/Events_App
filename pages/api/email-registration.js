import path from "path";
import fs from "fs";

function buildPath() {
  return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;

  //access data

  //extract data (AllEvents)
  //res(404) if there are no AllEvents
  //AllEvents - loop through events and identify correct eventId
  // add email into emails_registered - write on our data
  //Only if email does NOT exist
  //check format of email

  const filePath = buildPath();

  const { events_categories, allEvents } = extractData(filePath);

  if (!allEvents) {
    return res.stats(404).json({
      status: 404,
      message: "Events data not found",
    });
  }

  if (method === "POST") {
    //add code here
    const { email, eventId } = req.body;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    const newAllEvents = allEvents.map((ev) => {
      if (ev.id === eventId) {
        if (ev.emails_registered.includes(email)) {
          res
            .status(409)
            .json({ message: "This email has already been registered" });
          return ev;
        }
        return {
          ...ev,
          emails_registered: [...ev.emails_registered, email],
        };
      }
      return ev;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, allEvents: newAllEvents })
    );

    res.status(200).json({
      message: `You have been registered succesfully with email: ${email}`,
    });
  }
}
