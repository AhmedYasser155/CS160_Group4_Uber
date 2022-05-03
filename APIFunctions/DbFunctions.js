import axios from 'axios';
import { SERVER_URL } from "../config/config.json";
import { ApiResponse } from './ApiResponse';

export async function addUser(user) {
	let status = new ApiResponse();
	await axios
		.post(SERVER_URL + "/user/addUser", {
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

export async function addRide(data)
{
	let status = new ApiResponse();
	await axios
		.post(SERVER_URL + "/ride/addRide", {
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

export async function authenthicateUser(userEmail, userPassword)
{
	let status = new ApiResponse();
	await axios
		.post(SERVER_URL + "/auth",{		
			userEmail,
		 	userPassword
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
		.get(SERVER_URL + "/user/id", {
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

export async function updateUser(id, data) {
	let status = new ApiResponse();
	await axios
		.post(SERVER_URL + "/user/updateUser", {
			id,
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
		.post(SERVER_URL + "/user/deleteUser", {
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