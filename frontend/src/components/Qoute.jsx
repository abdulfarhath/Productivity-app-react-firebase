
import React from "react";

const quotes = [
  "The best way to predict the future is to invent it. – Alan Kay",
  "Life is 10% what happens to us and 90% how we react to it. – Charles R. Swindoll",
  "An unexamined life is not worth living. – Socrates",
  "Your time is limited, don’t waste it living someone else’s life. – Steve Jobs",
  "The only way to do great work is to love what you do. – Steve Jobs",
];

export default function Quote() {
  // Get today's date
  const today = new Date();
  
  // Use the day of the year to select a quote
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );

  // Pick a quote based on the day of the year (cyclic)
  const quoteOfTheDay = quotes[dayOfYear % quotes.length];

  return (
    <>
      <h1 className="text-2xl font-bold p-6">Quote of the Day</h1>
      <p className="text-lg p-4 italic">{quoteOfTheDay}</p>
    </>
  );
}
