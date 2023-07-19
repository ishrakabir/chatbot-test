const url: string = process.env.FLOWISE_URL || ""; // Provide a default value for the URL if it is not available

interface QueryData {
  question: string;
}

export async function query(data: QueryData): Promise<any> {
  const response = await fetch(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  return result;
}
