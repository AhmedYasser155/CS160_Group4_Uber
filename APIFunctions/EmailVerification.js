import axios from 'axios';
import { SERVER_URL } from "../config/config.json";
import { ApiResponse } from './ApiResponse';

export async function verifyEmail(email) {
	let status = new ApiResponse();
	await axios
		.post(SERVER_URL + "verify", {
			email
		})
		.then((response) => {
			status.responseData = response.data;
			status.statusCode = response.status;
		})
		.catch(err => {
			status.responseData = err;
            status.error = true;
        });
    return status;
}