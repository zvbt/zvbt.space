import { LanyardResponse} from "@/types/lanyard";
const ID = process.env.DISCORD_ID;


export async function lanyard() {
  const resp = await fetch(
    `https://api.lanyard.rest/v1/users/${ID}`,
    {
      cache: "no-cache",
    }
  );
  const response = await resp.json();
  const lanyard = response.data as LanyardResponse;
  return lanyard;
}

