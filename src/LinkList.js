import React from "react";

let headers = new Headers();

headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Origin", "http://localhost:3000");

fetch("http://localhost:8080/saves/get", {
  mode: "cors",
  method: "GET",
  headers: headers
})
  .then(response => response.json())
  .then(response =>
    this.setState({
      links: response
    })
  )
  .catch(error => console.log("error", error));
