'use strict';

//6.Chức năng: Search.
//	--Lấy dữ liệu về pet và breed từ localStorage 
//		lấy petArr từ localStorage (line: 29-34)	lấy breed (line:66-91)	hiển thị pet (line:38-64)
//	--Chức năng search: Sử dụng aray.filter để lọc ra array các pet thõa mãn điều kiện điền vào form
//		Tạo một array chứa các array lấy được từ filter ở trên rồi so sánh các phần tử trong các array 
//		đó có một pet nào xuất hiện trong tất cả array thì là pet cần tìm 		(line:93-126)
//
//
// Form
const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const typeInput = document.querySelector("#input-type");
const colorInput = document.querySelector("#input-color-1");
const breedInput = document.querySelector("#input-breed");
const vaccinatedInput = document.querySelector("#input-vaccinated");
const dewormedInput = document.querySelector("#input-dewormed");
const sterilizedInput = document.querySelector("#input-sterilized");

const findBtn = document.querySelector("#find-btn");
const tableBodyEl = document.querySelector("#tbody");


let petArr = [];
if (!localStorage.getItem("petArr")) {
	petArr = [];
} else {
	petArr = JSON.parse(localStorage.getItem("petArr"));
}

renderTableData(petArr);

function renderTableData(pets) {
	tableBodyEl.innerHTML = "";
	pets.forEach(pet => {
		const row = document.createElement("tr");
		row.innerHTML = genRow(pet);
		tableBodyEl.appendChild(row)
	})
}

function genRow(pet) {
	return `
			<th scope="row">${pet.id}</th>
			<td>${pet.name}</td>
			<td>${pet.age}</td>
			<td>${pet.type}</td>
			<td>${pet.weight} kg</td>
			<td>${pet.length} cm</td>
			<td>${pet.breed}</td>
			<td>
				<i class="bi bi-square-fill" style="color: ${pet.color}"></i>
			</td>
			<td><i class="bi ${pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
			<td><i class="bi ${pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
			<td><i class="bi ${pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
			<td>${pet.date.slice(9,11)}/${pet.date.slice(6,8)}/${pet.date.slice(1,5)}</td>
		 `
}

let breedArr = []
if(!localStorage.getItem("breedArr")){
	breedArr = [];
}else{
	breedArr = JSON.parse(localStorage.getItem("breedArr"));
}
const breedArrDog = [];
const breedArrCat = [];

breedArr.forEach((breed) => {
	if (breed.type === "Dog") {
		breedArrDog.push(breed);
	} else {
		breedArrCat.push(breed);
	}
});


(function renderBreed(breeds) {
	breedInput.innerHTML = "<option>Select Breed</option>";
	breeds.forEach((breed) => {
		const option = document.createElement("option");
		option.innerHTML = `${breed.breed}`;
		breedInput.appendChild(option);
	})
})(breedArr);

findBtn.addEventListener("click", function() {
	const searchArr = [];
	const searchPet = [];
	if (idInput.value) searchArr.push(petArr.filter((pet) => pet.id.includes(idInput.value)));
	if (nameInput.value) searchArr.push(petArr.filter((pet) => pet.name.includes(nameInput.value)));
	if (typeInput.value !== "Select Type") searchArr.push(petArr.filter((pet) => pet.type === typeInput.value));
	if (breedInput.value !== "Select Breed") searchArr.push(petArr.filter((pet) => pet.breed === breedInput.value));
	if (vaccinatedInput.checked) searchArr.push(petArr.filter((pet) => pet.vaccinated));
	if (dewormedInput.checked) searchArr.push(petArr.filter((pet) => pet.dewormed));
	if (sterilizedInput.checked) searchArr.push(petArr.filter((pet) => pet.sterilized));
	if (!searchArr.length) {

	} else if (searchArr.length === 1) {
		searchArr[0].forEach((search) => searchPet.push(search));
	} else {
		searchArr[0].forEach((search_0) => {
			let check = searchArr.reduce((acc, searchAr) => {
				let ck = false;
				searchAr.forEach((search) => {
					if (search.id === search_0.id) ck = true;
				});
				acc = acc && ck;
				return acc;
			}, true);
			if (check) searchPet.push(search_0);
		});
	}
	if (!searchPet.length) {
		alert("Can't find pet !!");
		renderTableData(petArr);
		resetForm();
	} else {
		renderTableData(searchPet);
	}
})


function resetForm() {
	idInput.value = "";
	nameInput.value = "";
	typeInput.value = "Select Type";
	breedInput.value = "Select Breed";
	dewormedInput.checked = false;
	vaccinatedInput.checked = false;
	sterilizedInput.checked = false;
}