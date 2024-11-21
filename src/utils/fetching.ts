export async function fetchName(uuid: string) {
  const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}api/mojang/${uuid}`, { method: "GET"});
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json();
}