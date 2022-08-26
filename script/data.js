'use strict';

//7. Export and import
//	--Export Tải về file JSON array các pet và array của breed lấy với hàm exportToJsonFile với 	
//		đầu vào là một array và tên file lưu		(line: 23-51)
//	--Import bằng cách tạo file JSON có dạng name = [{},{},...] rồi tạo link <script src="srouce"></script>
//		trong file.html để đọc và gửi file JSON lên localStorage 		
//	--Em đã tạo 2 file data_pet.json và data_breed.json trong thư mục cript. Nhấn nút import sẽ gửi dữ liệu 
//			từ 2 file đó lên localStorage	(line: 54-57)
//

const exportBtn = document.querySelector("#export-btn");
const importBtn = document.querySelector("#import-btn");


let petArr = [];
if(!localStorage.getItem("petArr")){
	petArr = [];
}else{
	petArr = JSON.parse(localStorage.getItem("petArr"));
}


let breedArr = []
if(!localStorage.getItem("breedArr")){
	breedArr = [];
}else{
	breedArr = JSON.parse(localStorage.getItem("breedArr"));
}

function exportToJsonFile(jsonData,s) {
	let dataStr = JSON.stringify(jsonData);
	let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
	let exportFileDefaultName = `${s}.json`;
	let linkElement = document.createElement('a');
	linkElement.setAttribute('href', dataUri);
	linkElement.setAttribute('download', exportFileDefaultName);
	linkElement.click();
}

exportBtn.addEventListener("click",function(){
	exportToJsonFile(petArr,prompt("Enter file name", "petData"));
	exportToJsonFile(breedArr,prompt("Enter file name", "breedData"));
})


importBtn.addEventListener("click",function(){
	localStorage.setItem("petArr",JSON.stringify(data_pet));
	localStorage.setItem("breedArr",JSON.stringify(data_breed));
	alert("Success!!");
})