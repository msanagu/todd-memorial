/**
 * Broadcast SMS Script
 *
 * Usage: node scripts/send-broadcast.js "Your message here"
 *
 * This script:
 * 1. Fetches all RSVPs from Firebase where smsConsent is true
 * 2. Sends your custom message to all opted-in phone numbers via Twilio
 * 
 HOW TO USE IN CLI:
 # Send a parking update
node scripts/send-broadcast.js "Parking update: Please use Lot B. Lot A is full."

# Send a livestream link
node scripts/send-broadcast.js "Livestream is now live: https://your-link-here"

# Send a schedule change
node scripts/send-broadcast.js "Service time has been moved to 1:30 PM. See you there."
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import twilio from "twilio";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Firebase config (same as your firebase.ts)
const firebaseConfig = {
  apiKey: "AIzaSyDMnN-Y2NUPOSRiIGJTqUe3cEaGW9mGdIM",
  authDomain: "todd-memorial.firebaseapp.com",
  projectId: "todd-memorial",
  storageBucket: "todd-memorial.firebasestorage.app",
  messagingSenderId: "1085002006859",
  appId: "1:1085002006859:web:a53edd3e7568af40a77c15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendBroadcast(message) {
  try {
    console.log("📱 Fetching opted-in attendees...\n");

    // Query Firebase for RSVPs with SMS consent
    const rsvpsRef = collection(db, "rsvps");
    const q = query(rsvpsRef, where("smsConsent", "==", true));
    const querySnapshot = await getDocs(q);

    const recipients = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.phone) {
        recipients.push({
          name: data.name,
          phone: data.phone,
        });
      }
    });

    if (recipients.length === 0) {
      console.log("⚠️  No recipients found with SMS consent.");
      return;
    }

    console.log(`Found ${recipients.length} recipient(s):\n`);
    recipients.forEach((r) => console.log(`  • ${r.name} - ${r.phone}`));
    console.log("\n📤 Sending messages...\n");

    // Send SMS to each recipient
    const results = await Promise.allSettled(
      recipients.map(async (recipient) => {
        const result = await twilioClient.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: recipient.phone,
        });
        return { recipient, result };
      })
    );

    // Report results
    let successCount = 0;
    let failCount = 0;

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        successCount++;
        console.log(`✅ Sent to ${recipients[index].name}`);
      } else {
        failCount++;
        console.log(
          `❌ Failed to send to ${recipients[index].name}: ${result.reason.message}`
        );
      }
    });

    console.log(`\n✨ Complete! ${successCount} sent, ${failCount} failed.`);
  } catch (error) {
    console.error("❌ Error sending broadcast:", error);
    process.exit(1);
  }
}

// Get message from command line argument
const message = process.argv[2];

if (!message) {
  console.error("❌ Error: Please provide a message");
  console.log('\nUsage: node scripts/send-broadcast.js "Your message here"');
  console.log("\nExample:");
  console.log(
    '  node scripts/send-broadcast.js "Parking update: Please use Lot B instead of Lot A."'
  );
  process.exit(1);
}

// Check for required environment variables
if (
  !process.env.TWILIO_ACCOUNT_SID ||
  !process.env.TWILIO_AUTH_TOKEN ||
  !process.env.TWILIO_PHONE_NUMBER
) {
  console.error("❌ Error: Missing Twilio environment variables");
  console.log("\nMake sure these are set in your .env file:");
  console.log("  TWILIO_ACCOUNT_SID");
  console.log("  TWILIO_AUTH_TOKEN");
  console.log("  TWILIO_PHONE_NUMBER");
  process.exit(1);
}

console.log("📨 Broadcasting message:\n");
console.log(`"${message}"\n`);

sendBroadcast(message);
