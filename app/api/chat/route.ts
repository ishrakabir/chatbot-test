import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url: string = process.env.FLOWISE_URL || "";
  const request = await req.json();

  console.log(request);

  let result: any;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    result = await response.json();
    console.log(result);
  } catch (error: any) {
    result = error?.code || "";
  }

  return NextResponse.json(result);
}
