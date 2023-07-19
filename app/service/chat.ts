const url= process.env.FLOWISE_URL
export async function query(data) {
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