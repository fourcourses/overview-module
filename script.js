import http from "k6/http";
let id = 1;
export let options = {
  vus: 200,
  duration: "1m"
};

export default function() {
  let res = http.get("http://localhost:3000/api/restaurant/"+id);
  id++;
};