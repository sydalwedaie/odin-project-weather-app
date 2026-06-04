function getWxQuery(city) {
  const API_KEY = "6RJREDA9FQWLUH2TTWD3J586D";
  const END_POINT =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
  return `${END_POINT}/${city}?unitGroup=metric&key=${API_KEY}`;
}

export async function getWxData(city) {
  const res = await fetch(getWxQuery(city));
  return await res.json();
}
