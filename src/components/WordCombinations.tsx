import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../stores';
import { toggleWordSelection } from '../stores/gridSlice';
import { Button, Box, TextField } from '@mui/material';

const WordCombinations: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const combinations = useSelector((state: RootState) => state.grid.allCombinations);

	const [search, setSearch] = useState(''); // Track search input

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value); // Set the actual search input
	};

	// Filter combinations based on the debounced search input
	const filteredCombinations = combinations.filter((combo) => combo.word.toLowerCase().includes(search.toLowerCase()));

	const handleToggle = (id: number) => {
		dispatch(toggleWordSelection(id));
	};

	return (
		<Box>
			{/* Search bar to filter combinations */}
			<TextField label='Search Combinations' value={search} onChange={handleSearchChange} variant='outlined' />
			{/* Display filtered combinations as buttons */}
			<Box sx={{ mt: 2 }}>
				{filteredCombinations.map((combo) => (
					<Button
						key={combo.word}
						variant={combo.isSelected ? 'contained' : 'outlined'}
						onClick={() => handleToggle(combo.id)}
						sx={{ m: 1 }}
						size='small'>
						{combo.word}
					</Button>
				))}
			</Box>
		</Box>
	);
};

export default WordCombinations;
