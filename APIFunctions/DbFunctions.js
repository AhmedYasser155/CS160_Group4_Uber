import axios from 'axios';
import { SERVER_URL } from "../config/config.json";
import { ApiResponse } from './ApiResponse';

export async function addUser(user) {
	let status = new ApiResponse();
	await axios
		.post(SERVER_URL + "/addUser", {
			user
		})
		.then((response) => {
			status.responseData = response.data;
			status.statusCode = response.status;
		})
		.catch(err => {
            status.error = true;
        });
    return status;
}

export async function getUser(id) {
	let status = new ApiResponse();
	await axios
		.get(SERVER_URL + "/getUser", {
			id
		})
		.then((response) => {
			status.responseData = response.data;
			status.statusCode = response.status;
		})
		.catch(err => {
            status.error = true;
        });
    return status;
}

export async function updateUser(data) {
	let status = new ApiResponse();
	await axios
		.post(SERVER_URL + "/updateUser", {
			data
		})
		.then((response) => {
			status.responseData = response.data;
			status.statusCode = response.status;
		})
		.catch(err => {
            status.error = true;
        });
    return status;
}

export async function deleteUser(id) {
	let status = new ApiResponse();
	await axios
		.post(SERVER_URL + "/deleteUser", {
			id
		})
		.then((response) => {
			status.responseData = response.data;
			status.statusCode = response.status;
		})
		.catch(err => {
            status.error = true;
        });
    return status;
}