import React from 'react';
import './App.scss';
import GridLayout from './components/GridLayout';
import WordCombinations from './components/WordCombinations';
import Results from './components/Results';
import { generateAllCombinations } from './utils/generateCombinations';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './stores';
import { setAllCombinations, setCorrectWords, setIncorrectWords } from './stores/gridSlice';
import { fetchWordValidity } from './api';
import { Box, Button, Typography } from '@mui/material';

const App: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const grid = useSelector((state: RootState) => state.grid.grid);
	const combinations = useSelector((state: RootState) => state.grid.allCombinations);

	const handleGenerate = () => {
		const allCombinations = generateAllCombinations(grid);
		const combinationsArray = Array.from(allCombinations);
		const wordStates = combinationsArray.map((word, index) => ({ id: index, word, isSelected: false, isHidden: false }));
		dispatch(setAllCombinations(wordStates));
	};

	const handleSolve = async () => {
		const selectedWords = combinations.filter((combo) => combo.isSelected).map((combo) => combo.word);

		const correctWords: string[] = [];
		const incorrectWords: string[] = [];

		for (const word of selectedWords) {
			const isValid = await fetchWordValidity(word);
			if (isValid) {
				correctWords.push(word);
			} else {
				incorrectWords.push(word);
			}
		}

		dispatch(setCorrectWords(correctWords));
		dispatch(setIncorrectWords(incorrectWords));
	};

	return (
		<Box className='app-container' textAlign='center'>
			<Typography variant='h3' gutterBottom>
				Quartiles Game Solver
			</Typography>
			<GridLayout />
			<Button variant='contained' onClick={handleGenerate} sx={{ mt: 4 }}>
				Generate Combinations
			</Button>
			<Results />
			<Button variant='contained' onClick={handleSolve} sx={{ mt: 4 }}>
				Solve
			</Button>
			<WordCombinations />
		</Box>
	);
};

export default App;
