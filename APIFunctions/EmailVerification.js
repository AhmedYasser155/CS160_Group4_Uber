import axios from 'axios';
import { SERVER_URL } from "../config/config.json";

export async function verifyEmail(email) {
	await axios
		.post(SERVER_URL + "/verify", {
			email
		})
		.then((response) => {
			return response;
		})
		.catch(error => {
            return error;
        });
    return null;
}