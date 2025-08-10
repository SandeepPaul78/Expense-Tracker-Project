const $addBtn = document.getElementById("addBtnTran");
 const table = document.getElementById("table");
$addBtn.addEventListener("click", function () {
  const tranNameInp = document.querySelector(".transaction-Name").value;
  const amountInp = parseFloat(document.querySelector(".amount").value.trim());
  const modeltype = document.querySelector(".modeltype").value;
 
  const date = new Date().toLocaleString();
  const data = {
    name: tranNameInp,
    amount : amountInp,
    type : modeltype,
    date : date
  }

  const row = document.createElement("tr");
  const editrow = table.querySelector("tr.edittransaction");
  if(editrow){
    editrow.innerHTML= ` <td class="name-expence">${tranNameInp}</td>
                <td class="transaction-amount">₹${amountInp}</td>
                <td class="cardtype">${modeltype}</td>
                <td class="date">${date}</td>
                <td>
                  <button class="editTran">Edit</button>
                  <button class="deleteTran">Delet</button>
                </td>`;

              editrow.classList.remove("edittransaction");
  }
  else{
  row.innerHTML = ` <td class="name-expence">${tranNameInp}</td>
                <td class="transaction-amount">₹${amountInp}</td>
                <td class="cardtype">${modeltype}</td>
                <td class="date">${date}</td>
                <td>
                  <button class="editTran">Edit</button>
                  <button class="deleteTran">Delet</button>
                </td>`;

  table.appendChild(row);
  

  }
   addToLocals(data)
 showtransaction (amountInp,modeltype );

  document.querySelector(".transaction-Name").value = "";
  document.querySelector(".amount").value = "";

  document.querySelector(".modeltype").value = "";


  
});

function showtransaction (amountInp, modeltype){
 
   let total = parseFloat(
    document.getElementById("total").innerText.replace("₹", "")
  );
  let income =
    parseFloat(document.getElementById("income").innerText.replace("₹", "")) ||
    0;
  let expence =
    parseFloat(document.getElementById("expence").innerText.replace("₹", "")) ||
    0;

  if (modeltype === "Credit") {
    income += amountInp;
    total = income - expence;
  }

  if (modeltype === "Debit") {
    expence += amountInp;
    total = income - expence;
  }

  document.getElementById("income").innerText = `₹${income}`;
  document.getElementById("expence").innerText = `₹${expence}`;
  document.getElementById("total").innerText = `₹${total}`;
};


// ADD TO LOCALSTORAGE
function addToLocals(data){
        let transactions = JSON.parse(localStorage.getItem("transactionlatest"))|| [];
        transactions.push(data);

        localStorage.setItem("transactionlatest", JSON.stringify(transactions))
};

// page reload localstorage

window.addEventListener("DOMContentLoaded", function(){
   const data = JSON.parse(localStorage.getItem("transactionlatest"))||[];
   data.forEach(element => {
    
     const row = document.createElement("tr");
     row.innerHTML = ` <td class="name-expence">${element.name}</td>
                <td class="transaction-amount">₹${element.amount}</td>
                <td class="cardtype">${element.type}</td>
                <td class="date">${element.date}</td>
                <td>
                  <button class="editTran">Edit</button>
                  <button class="deleteTran">Delet</button>
                </td>`;

  table.appendChild(row);
   showtransaction (element.amount, element.type );
   });
});


// DELET BTN HANDEL
table.addEventListener("click", function(e){
  if(e.target.classList.contains("deleteTran")){
    const row = e.target.closest("tr");
    const amount = parseFloat(row.querySelector(".transaction-amount").innerText.replace("₹", ""));
    const cardtype = row.querySelector(".cardtype").innerText.trim();
    const name = row.querySelector(".name-expence").innerText.trim();
    row.remove();
   
   deletetrasaction(amount,cardtype )
    deltlocal(name, amount, cardtype)

  }
});

function deletetrasaction(amount, cardtype){
    let total = parseFloat(
    document.getElementById("total").innerText.replace("₹", "")
  );
  let income =
    parseFloat(document.getElementById("income").innerText.replace("₹", "")) ||
    0;
  let expence =
    parseFloat(document.getElementById("expence").innerText.replace("₹", "")) ||
    0;

  if (cardtype === "Credit") {
    income -= amount;
    
  }

  if (cardtype === "Debit") {
    expence -= amount;
    
  }
  total = income - expence;

  document.getElementById("income").innerText = `₹${income}`;
  document.getElementById("expence").innerText = `₹${expence}`;
  document.getElementById("total").innerText = `₹${total}`;

};

// DELETE LOCAL STORAGE
 function deltlocal(name, amount, cardtype){
 const data = JSON.parse(localStorage.getItem("transactionlatest"))||[];
 let index = data.findIndex(ind=> ind.name===name&&ind.amount===amount&&ind.type===cardtype);
 if(index!==-1){
  data.splice(index, 1);
  localStorage.setItem("transactionlatest", JSON.stringify(data));
 }
 
 }

// EDIT BTN HANDLE
table.addEventListener("click", function(e){
  if(e.target.classList.contains("editTran")){
    const row = e.target.closest("tr");
    const name = row.querySelector(".name-expence").innerText.trim();
    const amount = parseFloat(row.querySelector(".transaction-amount").innerText.replace("₹", ""));
    const cardtype =  row.querySelector(".cardtype").innerText.trim();

    document.querySelector(".transaction-Name").value = name;
    document.querySelector(".amount").value = amount;
    document.querySelector(".modeltype").value = cardtype;

    deletetrasaction(amount,cardtype );

    row.classList.add("edittransaction");
        deltlocal(name, amount, cardtype)

  }
});






