import path from "path";

export default function handler(req, res) {
  const { method } = req;

  //access data

  //extract data (AllEvents)
  //res(404) if there are no AllEvents
  //AllEvents - loop through events and identify correct eventId
  // add email into emails_registered - write on our data
  //Only if email does NOT exist
  //check format of email

  function buildPath() {}
  if (method === "POST") {
    //add code here
    const { email, eventId } = req.body;
    res.status(200).json({
      message: `You have been registered succesfully with email: ${email}`,
    });
  }
}
