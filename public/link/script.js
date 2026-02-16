const kk = document.querySelector(".kk");

let url = "http://localhost:8081/users";

fetch(url, {
  method: "get",
  header: new Headers({
    "Content-type": "application/json",
  }),
})
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonResponse) {
    console.log(jsonResponse);
    kk.innerHTML = jsonResponse.data[0].name + " " + jsonResponse.data[0].description;
  });
