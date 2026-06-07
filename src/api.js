function getWxQuery(city) {
  const API_KEY = "6RJREDA9FQWLUH2TTWD3J586D";
  const END_POINT =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
  return `${END_POINT}/${city}?unitGroup=metric&key=${API_KEY}`;
}

export async function getWxData(city) {
  const res = await fetch(getWxQuery(city));
  console.log(res.ok);
  return await res.json();
}

export async function getLocationData(lat, long) {
  const API_KEY = "pk.7b33ec8e99f149d032c34850eed66151";
  const END_POINT = "https://us1.locationiq.com/v1/reverse";

  const query = `${END_POINT}?key=${API_KEY}&lat=${lat}&lon=${long}&normalizeaddress=1&format=json`;

  const res = await fetch(query);
  return await res.json();
}
