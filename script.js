import http from "k6/http";
export let options = {
  vus: 250,
  duration: "1m"
};

export default function() {
  let res = http.get("http://localhost:3000/api/restaurant/"+Math.ceil(Math.random() * 3000000));
};