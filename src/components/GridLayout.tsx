import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../stores';
import { setGrid } from '../stores/gridSlice';
import { Grid2, TextField } from '@mui/material';

const GridLayout: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>(); // Get dispatch function from Redux
	const grid = useSelector((state: RootState) => state.grid.grid); // Get grid state from Redux

	// Handle changes in the grid input
	const handleChange = (rowIndex: number, colIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		// Update the grid immediately in Redux
		const newGrid = grid.map((row, rIdx) => row.map((col, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : col)));
		dispatch(setGrid(newGrid)); // Dispatch the updated grid to Redux
	};

	return (
		<Grid2 container spacing={2} sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
			{/* Map through the grid rows and columns */}
			{grid.map((row, rowIndex) =>
				row.map((letter, colIndex) => (
					<Grid2 key={`${rowIndex}-${colIndex}`}>
						<TextField
							value={letter} // Display the current letter
							onChange={handleChange(rowIndex, colIndex)} // Handle input change
							slotProps={{ htmlInput: { style: { textAlign: 'center' } } }} // center text
							variant='outlined' // Material UI outlined variant for the TextField
							sx={{ width: 100, height: 60 }} // Set the width and height to fit about 5 characters
						/>
					</Grid2>
				))
			)}
		</Grid2>
	);
};

export default GridLayout;
