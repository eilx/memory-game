// Returns a random number from min (inclusive) to max (exclusive)
export const random = (min, max) =>
	Math.floor(Math.random() * (max - min + 1) + min)

// Shuffles an array, randomizing the order
export const shuffle = array => array
	.map(x => ({ x, sort: Math.random() }))
	.sort((x, y) => x.sort - y.sort)
	.map(({ x }) => x)
