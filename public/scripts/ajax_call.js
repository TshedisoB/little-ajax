const displayResults = document.querySelector(".displayResults");
const message = document.querySelector(".message");
const visitorsData = document.querySelector(".visitorsData");
const ajaxRequest = new XMLHttpRequest();
const newVisitor = document.querySelector(".newVisitor");

function loadMessage(data) {
  displayResults.style.display = "none";
  message.style.display = "flex";
  message.innerHTML = data;
}

function addVisitor() {
  ajaxRequest.open("POST", "/single_page_app", true);
  ajaxRequest.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );

  ajaxRequest.onload = function () {
    if (this.status === 200) {
      newVisitor.innerHTML = `New visitor has been added.`;
      newVisitor.style.display = "flex";
      setTimeout(() => {
        newVisitor.style.display = "none";
      }, 3500);
    }
    displayVisitors();
  };

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const assistedBy = document.getElementById("assistedBy").value;
  const comments = document.getElementById("comments").value;

  if (
    name === "" ||
    age === "" ||
    date === "" ||
    time === "" ||
    assistedBy === "" ||
    comments === ""
  ) {
    return;
  }

  ajaxRequest.send(
    `name=${name}&age=${age}&date=${date}&time=${time}&assistedBy=${assistedBy}&comments=${comments}`
  );

  const inputs = document.querySelectorAll(
    "#name, #age,#date,#time,#assistedBy,#comments"
  );

  inputs.forEach((input) => {
    input.value = "";
  });
}

function displayVisitors() {
  ajaxRequest.open("GET", "/single_page_app/all", true);

  ajaxRequest.onload = function () {
    if (this.status == 200) {
      const data = JSON.parse(this.responseText);

      let output = `
      <thead>        
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Date of Visit</th>
          <th>Time of Visit</th>
          <th>Assistant</th>
          <th>Comments</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>`;

      if (data === "No visitors found in the database") {
        loadMessage(data);
      } else {
        data.forEach((visitor) => {
          const date = visitor.date.substring(0, 10);
          const time = visitor.time.substring(0, 5);

          message.style.display = "none";
          displayResults.style.display = "flex";

          output += `
        <tr>
          <td>${visitor.name}</td>
          <td>${visitor.age}</td>
          <td>${date}</td>
          <td>${time}</td>
          <td>${visitor.assistedby}</td>
          <td>${visitor.comments}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteVisitor(${visitor.id})">Delete</button>
          </td>
        </tr>`;
        });
      }
      output += "</tbody>";
      visitorsData.innerHTML = output;
    }
  };
  ajaxRequest.send();
}
displayVisitors();

function deleteVisitor(id) {
  ajaxRequest.open("DELETE", `/single_page_app/${id}`, true);

  ajaxRequest.onload = function () {
    if (this.status == 200) {
      displayVisitors();
    }
  };
  ajaxRequest.send();
}
