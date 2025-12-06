document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.height = "100vh";
document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.background = "linear-gradient(135deg, #4a90e2, #50e3c2)";

const container = document.createElement("div");
container.style.width = "700px";
container.style.background = "#fff";
container.style.padding = "25px";
container.style.borderRadius = "15px";
container.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
document.body.appendChild(container);

const title = document.createElement("h2");
title.innerText = " Employee Management System (API)";
title.style.textAlign = "center";
title.style.marginBottom = "20px";
title.style.color = "#333";
container.appendChild(title);

const formDiv = document.createElement("div");
formDiv.style.display = "flex";
formDiv.style.flexWrap = "wrap";
formDiv.style.gap = "10px";
formDiv.style.justifyContent = "center";
formDiv.style.marginBottom = "20px";
container.appendChild(formDiv);

const nameInput = document.createElement("input");
nameInput.placeholder = "Name";
nameInput.style.flex = "1";
nameInput.style.minWidth = "150px";
nameInput.style.padding = "10px";
nameInput.style.borderRadius = "8px";
nameInput.style.border = "1px solid #ccc";
formDiv.appendChild(nameInput);

const ageInput = document.createElement("input");
ageInput.placeholder = "Age";
ageInput.type = "number";
ageInput.style.flex = "1";
ageInput.style.minWidth = "80px";
ageInput.style.padding = "10px";
ageInput.style.borderRadius = "8px";
ageInput.style.border = "1px solid #ccc";
formDiv.appendChild(ageInput);

const salaryInput = document.createElement("input");
salaryInput.placeholder = "Salary";
salaryInput.type = "number";
salaryInput.style.flex = "1";
salaryInput.style.minWidth = "100px";
salaryInput.style.padding = "10px";
salaryInput.style.borderRadius = "8px";
salaryInput.style.border = "1px solid #ccc";
formDiv.appendChild(salaryInput);

const departmentInput = document.createElement("input");
departmentInput.placeholder = "Department";
departmentInput.style.flex = "1";
departmentInput.style.minWidth = "120px";
departmentInput.style.padding = "10px";
departmentInput.style.borderRadius = "8px";
departmentInput.style.border = "1px solid #ccc";
formDiv.appendChild(departmentInput);

const addBtn = document.createElement("button");
addBtn.innerText = "Add Employee";
addBtn.style.padding = "10px 20px";
addBtn.style.border = "none";
addBtn.style.background = "#4a90e2";
addBtn.style.color = "#fff";
addBtn.style.borderRadius = "8px";
addBtn.style.cursor = "pointer";
addBtn.style.marginTop = "10px";
formDiv.appendChild(addBtn);

const table = document.createElement("table");
table.style.width = "100%";
table.style.borderCollapse = "collapse";
table.style.marginTop = "20px";
container.appendChild(table);

const thead = document.createElement("thead");
thead.innerHTML = `
<tr style="background:#4a90e2; color:white;">
  <th style="padding:10px;">ID</th>
  <th>Name</th>
  <th>Age</th>
  <th>Salary</th>
  <th>Department</th>
  <th>Actions</th>
</tr>`;
table.appendChild(thead);

const tbody = document.createElement("tbody");
table.appendChild(tbody);

const API_URL = "https://jsonplaceholder.typicode.com/users"; 
let editId = null;

function fetchEmployees() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      employees = data.map(user => ({
        id: user.id,
        name: user.name,
        age: Math.floor(Math.random()*10)+20,
        salary: Math.floor(Math.random()*10000)+3000,
        department: ["HR","IT","Finance","Marketing"][Math.floor(Math.random()*4)]
      }));
      renderTable();
    })
    .catch(err => console.error(err));
}

function renderTable() {
  tbody.innerHTML = "";
  employees.forEach(emp => {
    const tr = document.createElement("tr");
    tr.style.textAlign = "center";
    tr.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.age}</td>
      <td>${emp.salary}</td>
      <td>${emp.department}</td>
      <td>
        <button style="background:#ffa726;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;margin-right:5px;">Update</button>
        <button style="background:#e53935;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);

    tr.querySelector("button:nth-child(1)").onclick = () => {
      nameInput.value = emp.name;
      ageInput.value = emp.age;
      salaryInput.value = emp.salary;
      departmentInput.value = emp.department;
      editId = emp.id;
    };

    tr.querySelector("button:nth-child(2)").onclick = () => {
      fetch(`${API_URL}/${emp.id}`, { method: "DELETE" })
        .then(() => {
          employees = employees.filter(e => e.id !== emp.id);
          renderTable();
        });
    };
  });
}

addBtn.onclick = () => {
  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const salary = salaryInput.value.trim();
  const department = departmentInput.value.trim();

  if (!name || !age || !salary || !department) {
    alert("Please fill all fields");
    return;
  }

  const newEmployee = { name, age, salary, department };

  if (editId) {
    fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee)
    })
      .then(res => res.json())
      .then(data => {
        const emp = employees.find(e => e.id === editId);
        Object.assign(emp, newEmployee);
        clearForm();
        renderTable();
      });
  } else {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee)
    })
      .then(res => res.json())
      .then(data => {
        newEmployee.id = data.id; 
        employees.push(newEmployee);
        clearForm();
        renderTable();
      });
  }
};

function clearForm() {
  nameInput.value = "";
  ageInput.value = "";
  salaryInput.value = "";
  departmentInput.value = "";
  editId = null;
}

fetchEmployees();
