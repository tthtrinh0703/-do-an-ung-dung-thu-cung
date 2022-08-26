'use strict';

//5.Chức năng edit: 
//	--Hiển thị bảng pet đã lưu trong localStorage tương tự ASM1 + 2.	line: 
//	hàm hiển thị table (line: 44-72)	
//	--Khi bấm vào edit button thì hiện ra form bằng cách xóa và thêm class "hidden"
//	--Hiển thị breed tương ứng với type tương tự bài 4.  	(line: 77-110)
//	--Không thể chỉnh sửa trường ID bằng cách thêm chức năng readonly vào pet ID
//	--Khi bấm nút Edit, giá trị trên form sẽ là thông tin của pet đó bằng cách thêm attribute
//		data-id=pet.id với mỗi pet để phân biệt rồi từ đó lấy data của pet đó đưa lên form 		(line: 112-131)
//	--Validate khi bầm submit tương tự như ASM1		(line: 133-203)
//
//
// Form
const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const ageInput = document.querySelector("#input-age");
const typeInput = document.querySelector("#input-type");
const weightInput = document.querySelector("#input-weight");
const lengthInput = document.querySelector("#input-length");
const colorInput = document.querySelector("#input-color-1");
const breedInput = document.querySelector("#input-breed");
const vaccinatedInput = document.querySelector("#input-vaccinated");
const dewormedInput = document.querySelector("#input-dewormed");
const sterilizedInput = document.querySelector("#input-sterilized");

const submitBtn = document.querySelector("#submit-btn");
const tableBodyEl = document.querySelector("#tbody");


let petArr = [];
if (!localStorage.getItem("petArr")) {
	petArr = [];
} else {
	petArr = JSON.parse(localStorage.getItem("petArr"));
}

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
			<td><button type="button" class="btn btn-warning btn-delete" id="btn-edit" data-id="${pet.id}">Edit</button>
							</td>
		 `
}

renderTableData(petArr);


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


function renderBreed(breeds) {
	breedInput.innerHTML = "<option>Select Breed</option>";
	breeds.forEach((breed) => {
		const option = document.createElement("option");
		option.innerHTML = `${breed.breed}`;
		breedInput.appendChild(option);
	})
};

typeInput.addEventListener("click", function() {
	if (typeInput.value === "Dog") {
		renderBreed(breedArrDog);
	} else {
		renderBreed(breedArrCat);
	}
});

const form = document.querySelector("#main--form");
tableBodyEl.addEventListener("click", function(e) {
	if (e.target.id != "btn-edit") return;
	const petId = e.target.getAttribute("data-id");
	if (!petId) return;
	form.classList.remove("hidden");
	const pet = petArr[petArr.findIndex(pet => pet.id === petId)];
	renderBreed(breedArr);
	idInput.value = pet.id;
	nameInput.value = pet.name;
	ageInput.value = pet.age;
	typeInput.value = pet.type;
	weightInput.value = pet.weight;
	lengthInput.value = pet.length;
	colorInput.value = pet.color;
	breedInput.value = pet.breed;
	vaccinatedInput.checked = pet.vaccinated;
	dewormedInput.checked = pet.dewormed;
	sterilizedInput.checked = pet.sterilized;
});

submitBtn.addEventListener("click", function() {

	//vallidate form
	function validate() {
		let message = "";
		let check = true;
		if (breedInput.value === "Select Breed") {
			check = false;
			message = "Please select Breed!.";
		}
		if (!parseInt(lengthInput.value)) {
			check = false;
			message = "Plese fill in length!";
		}
		if (parseInt(lengthInput.value) < 1 || parseInt(lengthInput.value) > 100) {
			check = false;
			message = "Length must be between 1 and 100!";
		}
		if (!parseInt(weightInput.value)) {
			check = false;
			message = "Plese fill in weight!";
		}
		if (parseInt(weightInput.value) < 1 || parseInt(weightInput.value) > 15) {
			check = false;
			message = "Weight must between 1 and 15!";
		}
		if (typeInput.value === "Select Type") {
			check = false;
			message = "Please select Type!.";
		}
		if (!parseInt(ageInput.value)) {
			check = false;
			message = "Plese fill in age!"
		}
		if (parseInt(ageInput.value) < 1 || parseInt(ageInput.value) > 15) {
			check = false;
			message = "Age must between 1 and 15!";
		}
		if (!nameInput.value) {
			check = false;
			message = "Please fill in name!"
		}
		const validate = {
			ok: check,
			alertMessage: message,
		}
		return validate;
	}

	const pet = petArr[petArr.findIndex(pet => pet.id === idInput.value)];
	const validateForm = validate();
	if(validateForm.ok){
		pet.name = nameInput.value;
		pet.age = parseInt(ageInput.value);
		pet.type = typeInput.value;
		pet.weight = parseInt(weightInput.value);
		pet.length = parseInt(lengthInput.value);
		pet.color = colorInput.value;
		pet.breed = breedInput.value;
		pet.vaccinated = vaccinatedInput.checked;
		pet.dewormed = dewormedInput.checked;
		pet.sterilized = sterilizedInput.checked;
		localStorage.setItem("petArr",JSON.stringify(petArr));
		renderTableData(petArr);
		console.log(petArr);
		form.classList.add("hidden");

	}else{
		alert(validateForm.alertMessage);
	}
});