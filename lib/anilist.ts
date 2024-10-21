import { Main } from "@/types/anilist";

function getAnilistQuery(type: "MANGA" | "ANIME") {
  return `query($username: String) {
            MediaListCollection(userName: $username, forceSingleCompletedList: true, 
              type: ${type}, status: CURRENT, sort: UPDATED_TIME_DESC) {
              lists {
                entries {
                  updatedAt
                  id
                  progress
                  media {
                    siteUrl
                    coverImage {
                      extraLarge
                    }
                    title {
                      userPreferred
                    }
                  }
                }
              }
            }
          }`;
}

export async function recentActivity(type: "MANGA" | "ANIME") {
  const variables = {
    username: process.env.NEXT_PUBLIC_ANILIST_USERNAME,
  };
  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: getAnilistQuery(type),
      variables,
    }),
    cache: "no-cache",
  });
  if (!res.ok) return null;
  const { data }: Main = await res.json();
  return data.MediaListCollection.lists[0].entries[0];
}