export const generateAllCombinations = (grid: string[][]): Set<string> => {
	const flatArr = grid.flat();
	const minWordLength = 1;
	const maxWordLength = 4;
	const foundCombos: Set<string> = new Set();

	const helper = (currentWord: string[], remaining: string[], length: number) => {
		const currentWordStr = currentWord.join(''); // Convert currentWord array to string

		// Add to foundCombos if word length is within the min and max limits and passes validity check
		if (currentWord.length >= minWordLength && currentWord.length <= maxWordLength) {
			foundCombos.add(currentWordStr);
		}

		// Stop if we've reached the desired length
		if (currentWord.length === maxWordLength) return;

		for (let i = 0; i < remaining.length; i++) {
			const newRemaining = remaining.slice(i + 1);
			currentWord.push(remaining[i]);
			helper(currentWord, newRemaining, length - 1);
			currentWord.pop(); // Backtrack after recursion
		}
	};

	// Generate combinations from length 1 up to the specified max length
	for (let length = 1; length <= maxWordLength; length++) {
		helper([], flatArr, length);
	}

	return foundCombos;
};
