const twilio = require("twilio");

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { name, phone, guests, attending } = JSON.parse(event.body);

    // Initialize Twilio client
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Send confirmation SMS
    const message = await client.messages.create({
      body: `Thank you ${name} for your RSVP! You've confirmed ${
        attending === "yes" ? "attendance" : "you cannot attend"
      } ${
        attending === "yes" ? `for ${guests} guest(s)` : ""
      }. You will receive updates about the memorial service for Todd James San Agustin on Dec 19th.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        messageSid: message.sid,
      }),
    };
  } catch (error) {
    console.error("Error sending SMS:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to send SMS",
        details: error.message,
      }),
    };
  }
};
