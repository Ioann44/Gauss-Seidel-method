"use strict";

function reset() {
	let arr = document.getElementsByTagName("input");
	for (const input of arr) {
		input.value = "";
	}
	clear_output();
}

async function resolve() {
	// считать значения ячеек
	let arrStart = document.getElementsByTagName("input");
	let arr = []
	for (let i = 0; i < 36; i++) {
		arr.push(arrStart[i].value || 0)
	}

	let stringArr = stringify_array(arr);

	let response = await fetch("/compute/" + stringArr);
	if (response.status == 204) {
		let resString = await response.text();
		console.log(resString);
	} else {
		alert("Ошибка HTTP: " + response.status);
	}


	// вывод ответа
	for (let i = 0; i < 6; i++) {
		if (isNaN(x[i])) {
			clear_output();
			alert("Единственное решение СЛАУ отсутствует");
			break;
		}
		document.getElementById("x" + i).innerHTML = parseFloat(x[i].toFixed(dec_len));
	}
}

function stringify_array(arr) {
	let res = "";
	for (let i = 0; i < arr.length; i++) {
		res += arr[i];
		res += " ";
	}
	return res;
}

function clear_output() {
	for (let i = 0; i < 6; i++) {
		document.getElementById("x" + i).innerHTML = "";
	}
}

function compute_trace(matrix) {
	let trace = 0;
	for (let i = 0; i < matrix.length; i++) {
		trace += matrix[i][i];
	}
}

function getValue(i, j) {
	return document.getElementsByTagName("input")[7 * i + j].value || 0
}

function TransMatrix(A)       //На входе двумерный массив
{
	var m = A.length, n = A[0].length, AT = [];
	for (var i = 0; i < n; i++) {
		AT[i] = [];
		for (var j = 0; j < m; j++) AT[i][j] = A[j][i];
	}
	return AT;
}

function MultiplyMatrix(A, B) {
	var rowsA = A.length, colsA = A[0].length,
		rowsB = B.length, colsB = B[0].length,
		C = [];
	if (colsA != rowsB) return false;
	for (var i = 0; i < rowsA; i++) C[i] = [];
	for (var k = 0; k < colsB; k++) {
		for (var i = 0; i < rowsA; i++) {
			var t = 0;
			for (var j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
			C[i][k] = t;
		}
	}
	return C;
}