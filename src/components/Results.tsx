import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';
import { Box, Typography } from '@mui/material';

const Results: React.FC = () => {
	const correctWords = useSelector((state: RootState) => state.grid.correctWords);
	const incorrectWords = useSelector((state: RootState) => state.grid.incorrectWords);

	return (
		<Box>
			<Box mt={4}>
				<Typography variant='h5'>Correct Words</Typography>
				<Box>
					{correctWords.map((word) => (
						<Typography key={word}>{word}</Typography>
					))}
				</Box>
			</Box>

			<Box mt={4}>
				<Typography variant='h5'>Incorrect Words</Typography>
				<Box>
					{incorrectWords.map((word) => (
						<Typography key={word}>{word}</Typography>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default Results;
