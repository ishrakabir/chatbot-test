import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url: string = process.env.FLOWISE_URL || ""; // Get the FLOWISE_URL from the environment variables, or use an empty string as a fallback
  const request = await req.json(); // Parse the incoming request body as JSON

  console.log(request); // Log the parsed request body to the console

  let result: any; // Initialize a variable to store the response from the FLOWISE_URL

  try {
    const response = await fetch(url, { // Send a POST request to the FLOWISE_URL with the parsed request as the body
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the request header to indicate that the body contains JSON data
      },
      body: JSON.stringify(request), // Convert the parsed request body to JSON string
    });

    result = await response.json(); // Parse the response from the FLOWISE_URL as JSON
    console.log(result); // Log the parsed response to the console
  } catch (error: any) { // Catch any errors that may occur during the fetch operation
    result = error?.code || ""; // If an error occurs, store the error code (if available) or an empty string
  }

  return NextResponse.json(result); // Return a JSON response using the NextResponse object containing the result data
}
