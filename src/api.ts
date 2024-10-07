// src/api.ts
import axios from 'axios';

// Function to validate a word using the dictionary API
export const fetchWordValidity = async (word: string): Promise<boolean> => {
	try {
		const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
		return data.length > 0;
	} catch {
		return false;
	}
};
