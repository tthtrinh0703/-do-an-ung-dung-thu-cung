'use strict';

//ASM1
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

//btn
const submitBtn = document.querySelector("#submit-btn");
const healthyBtn = document.querySelector("#healthy-btn");
let healthyCheck = false;
let petArr = [];
if (!localStorage.getItem("petArr")) {
	petArr = [];
} else {
	petArr = JSON.parse(localStorage.getItem("petArr"));
}
const tableBodyEl = document.querySelector("#tbody");

//Render data
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
			<td class="BMI-${pet.id}">?</td>
			<td>${pet.date.slice(9,11)}/${pet.date.slice(6,8)}/${pet.date.slice(1,5)}</td>
			<td><button type="button" class="btn btn-danger btn-delete" id="btn-delete" data-id="${pet.id}">Delete</button>
							</td>
		 `
}

// reser form
function resetForm() {
	idInput.value = "";
	nameInput.value = "";
	ageInput.value = "";
	typeInput.value = "Select Type";
	weightInput.value = "";
	lengthInput.value = "";
	colorInput.value = "#000000";
	breedInput.value = "Select Breed";
	dewormedInput.checked = false;
	vaccinatedInput.checked = false;
	sterilizedInput.checked = false;
}


submitBtn.addEventListener("click", function() {
	//form => data
	const data = {
		id: idInput.value,
		name: nameInput.value,
		age: parseInt(ageInput.value),
		type: typeInput.value,
		weight: parseInt(weightInput.value),
		length: parseInt(lengthInput.value),
		color: colorInput.value,
		breed: breedInput.value,
		dewormed: dewormedInput.checked,
		vaccinated: vaccinatedInput.checked,
		sterilized: sterilizedInput.checked,
		date: JSON.stringify(new Date()),
	}

	//vallidat form
	function validate() {
		let message = "";
		let check = true;
		if (data.breed === "Select Breed") {
			check = false;
			message = "Please select Breed!.";
		}
		if (!data.length) {
			check = false;
			message = "Plese fill in length!";
		}
		if (data.length < 1 || data.length > 100) {
			check = false;
			message = "Length must be between 1 and 100!";
		}
		if (!data.weight) {
			check = false;
			message = "Plese fill in weight!";
		}
		if (data.weight < 1 || data.weight > 15) {
			check = false;
			message = "Weight must between 1 and 15!";
		}
		if (data.type === "Select Type") {
			check = false;
			message = "Please select Type!.";
		}
		if (!data.age) {
			check = false;
			message = "Plese fill in age!"
		}
		if (data.age < 1 || data.age > 15) {
			check = false;
			message = "Age must between 1 and 15!";
		}
		if (!data.name) {
			check = false;
			message = "Please fill in name!"
		}
		if (!data.id) {
			check = false;
			message = "Please fill in id!";
		}
		for (let i = 0; i < petArr.length; i++) {
			if (data.id === petArr[i].id) {
				check = false;
				message = "ID must unique!";
			}
		}
		const validate = {
			ok: check,
			alertMessage: message,
		}
		return validate;
	}
	const validateForm = validate();
	if (validateForm.ok) {
		petArr.push(data);
		renderTableData(petArr);
		localStorage.setItem("petArr", JSON.stringify(petArr));
		resetForm();
	} else {
		alert(validateForm.alertMessage);
	}
});


//Delete data
tableBodyEl.addEventListener("click", function(e) {
	if (e.target.id != "btn-delete") return;
	const petId = e.target.getAttribute("data-id");
	if (!petId) return;
	if (!confirm("Are you sure?")) return;
	console.log(`Delete pet with id = ${petId}`);
	petArr.splice(petArr.findIndex(pet => pet.id === petId), 1);
	localStorage.setItem("petArr", JSON.stringify(petArr));
	renderTableData(petArr);
})

// Show healty pets
healthyBtn.addEventListener("click", function() {
	const healthyArr = petArr.filter(pet => {
		return (pet.vaccinated && pet.dewormed && pet.sterilized);
	});
	healthyCheck = healthyCheck ? false : true;
	healthyBtn.textContent = healthyCheck ? "Show All Pet" : "Show Healthy Pet";
	renderTableData(healthyCheck ? healthyArr : petArr);
})


//ASM2
//Nên vào data và import dữ liệu lên đầu tiên để có danh sách breed phục vụ cho các chức năng khác
//
//1.Bổ xung animation cho Sidebar
const sideBar = document.querySelector("#sidebar");
sideBar.addEventListener("click", function() {
	sideBar.classList.toggle("active")
})


//2.Lưu dữ liệu dưới LocalStorage (Em viết code phần này trong file script.js chứ không phải trong file storage.js như yêu cầu)
//	--Lưu dữ liệu là một array chứa object data các pet trong localStorage bằng cách sử dụng hàm 
//	localStorage.setItem và JSON.stringify chạy mỗi khi thêm 1 pet mới hay xóa 1 pet     line: 159   line: 175
//	--Khi mở lại ứng dụng lấy dữ liệu localStorage và hiển thị các thú cưng đã nhập bằng cách sử dụng hàm 
//	localStorage.getItem và JSON.prase lấy ra mảng những thú cưng đã lưu ở trên rồi hiển thị bằng hàm renderTableData 
// 	ở ASM1            line:26-31
renderTableData(petArr);


//3. Quản lý breed
//
//
//4. Hiển thị breed
//	--Lấy dữ liệu breed từ localStorage lưu vào breedArr		line: 227-232
//	--Chia dữ liệu dựa vào type  	line: 233-242	
//	--Tạo hàm renderBreed để show breeds	line:248-255
//	--Tạo sự kiện khi chọn type sẽ hiển thị breeds phù hợp	line: 257-263
//
//
//5. edit.js 		6.search.js 		7.data.js 		
//
//
let breedArr = []
if (!localStorage.getItem("breedArr")) {
	breedArr = [];
} else {
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
})


function rederBreed(breeds) {
	breedInput.innerHTML = "<option>Select Breed</option>";
	breeds.forEach((breed) => {
		const option = document.createElement("option");
		option.innerHTML = `${breed.breed}`;
		breedInput.appendChild(option);
	})
};

//typeInput.addEventListener("click", function() {
	//if (typeInput.value === "Dog") {
		//rederBreed(breedArrDog);
	//} else {
		//rederBreed(breedArrCat);
	//}
//})

// new code
typeInput.addEventListener("change", function () {
	const optionsValue = breedArr.filter(function (item) {
	if (typeInput.value === "Dog") return item.type === "Dog";
	if (typeInput.value === "Cat") return item.type === "Cat";
	if (typeInput.value === "Select type") return [];
	});
	rederBreed(optionsValue);
	});