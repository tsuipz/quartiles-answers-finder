import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the types for the grid and state
type GridType = string[][];
type WordState = {
	id: number;
	word: string;
	isSelected: boolean;
	isHidden: boolean;
};

interface GridState {
	grid: GridType; // 4x5 grid
	allCombinations: WordState[];
	correctWords: string[];
	incorrectWords: string[];
}

// Initial state with an empty grid and no words
const initialState: GridState = {
	grid: Array(4).fill(Array(5).fill('')), // Initialize 4x5 grid with empty strings
	allCombinations: [], // Start with an empty array of valid words
	correctWords: [],
	incorrectWords: [],
};

// Create a slice for managing the grid and valid words
export const gridSlice = createSlice({
	name: 'grid', // Name of the slice
	initialState, // Initial state
	reducers: {
		// Action to update the grid state
		setGrid: (state, action: PayloadAction<GridType>) => {
			state.grid = action.payload;
		},
		// Action to update the valid words list
		setAllCombinations: (state, action: PayloadAction<WordState[]>) => {
			state.allCombinations = action.payload;
		},
		toggleWordSelection: (state, action: PayloadAction<number>) => {
			const wordIndex = action.payload;
			if (wordIndex > -1) {
				state.allCombinations[wordIndex].isSelected = !state.allCombinations[wordIndex].isSelected;
			}
		},
		setCorrectWords: (state, action: PayloadAction<string[]>) => {
			// Add the correct words to the list of correct words
			state.correctWords = [...state.correctWords, ...action.payload];

			// Hide the correct words from the list of valid words
			state.allCombinations = state.allCombinations.map((word) => {
				if (action.payload.includes(word.word)) {
					return { ...word, isHidden: true };
				}
				return word;
			});
		},
		setIncorrectWords: (state, action: PayloadAction<string[]>) => {
			// Add the incorrect words to the list of incorrect words
			state.incorrectWords = [...state.incorrectWords, ...action.payload];

			// Hide the incorrect words from the list of valid words
			state.allCombinations = state.allCombinations.map((word) => {
				if (action.payload.includes(word.word)) {
					return { ...word, isHidden: true };
				}
				return word;
			});
		},
	},
});

export const { setGrid, setAllCombinations, toggleWordSelection, setCorrectWords, setIncorrectWords } = gridSlice.actions; // Export actions for use in components
export default gridSlice.reducer; // Export the reducer to be used in the store
