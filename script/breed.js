'use strict';

//3.Tạo array những object breed như bài 2.
//	--Tạo table các chức năng thêm breed và xóa dữ liệu tương tự ASM1     
//	thêm breed: line:52-89  xóa breed: 92-101	hiển thị bảng: 29-46
//	--Lưu dữ liệu vào localStorage mỗi khi thêm breed hoặc xóa 1 breed 	line: 82  line: 98
//	--Mỗi lần tải lại trang thì những breed trong localStorage sẽ hiển thị 
//	tương tự 2.  		line: 19-24
//
//
const breedIn = document.querySelector("#input-breed");
const typeIn = document.querySelector("#input-type");

const submitB = document.querySelector("#submit-btn");
let breedArr = []
if (!localStorage.getItem("breedArr")) {
	breedArr = [];
} else {
	breedArr = JSON.parse(localStorage.getItem("breedArr"));
}

const tableBodyEl = document.querySelector("#tbody");

function renderTableBreed(breeds) {
	tableBodyEl.innerHTML = "";
	breeds.forEach((breed, ind) => {
		let row = document.createElement("tr");
		row.innerHTML = genRow(breed, ind);
		tableBodyEl.appendChild(row);
	})
};

function genRow(breed, ind) {
	return `
		<th scope="row">${ind+1}</th>
			<td>${breed.breed}</td>
			<td>${breed.type}</td>
			<td><button type="button" class="btn btn-danger btn-delete" id="btn-delete" breedAtt="${breed.breed}">Delete</button>
							</td>
		 `
};

function reset() {
	breedIn.value = "";
	typeIn.value = "Select Type";
};

submitB.addEventListener("click", function() {
	const data = {
		breed: breedIn.value,
		type: typeIn.value,
	}

	function validate() {
		let check = true;
		let message = "";
		if (data.type === "Select Type") {
			check = false;
			message = "Please select Type!.";
		}
		for (let i = 0; i < breedArr.length; i++) {
			if (data.breed === breedArr[i].breed && data.type === breedArr[i].type) {
				check = false;
				message = "Breed must unique!";
			}
		}
		if (!data.breed) {
			check = false;
			message = "Please fill in breed!.";
		}
		return {
			ok: check,
			alertMessage: message
		};
	}
	const validateForm = validate();
	if (validateForm.ok) {
		breedArr.push(data);
		localStorage.setItem("breedArr", JSON.stringify(breedArr));
		reset();
		renderTableBreed(breedArr);
	} else {
		alert(validateForm.alertMessage);
	}
});


tableBodyEl.addEventListener("click", function(e) {
	if (e.target.id != "btn-delete") return;
	const breedAtt = e.target.getAttribute("breedAtt");
	if (!breedAtt) return;
	if (!confirm("Are you sure?")) return;
	console.log(typeof breedAtt);
	breedArr.splice(breedArr.findIndex(breed => breed.breed === breedAtt), 1);
	localStorage.setItem("breedArr", JSON.stringify(breedArr));
	renderTableBreed(breedArr);
})

renderTableBreed(breedArr);
