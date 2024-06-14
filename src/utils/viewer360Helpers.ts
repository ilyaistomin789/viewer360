import { Rotation } from '../interfaces';

export const decrementMovement = (decr: number, movement: number): number =>
	movement - decr > 0 ? movement - decr : 0;

const checkPrev = (movement: number, imageIndexArray: number[], index: number) => {
	if (movement > 0) {
		return imageIndexArray[index - movement] !== undefined
			? imageIndexArray[index - movement]
			: imageIndexArray[imageIndexArray.length - 1 - movement];
	}
	return imageIndexArray[index - 1];
};

const checkNext = (movement: number, imageIndexArray: number[], index: number): number => {
	if (movement > 0) {
		return imageIndexArray[index + movement] !== undefined
			? imageIndexArray[index + movement]
			: imageIndexArray[0 + movement];
	}
	return imageIndexArray[index + 1];
};

export const chooseIndex = (
	imageIndexArray: number[],
	index: number,
	rotationDirection: Rotation,
	movement: number
): number => {
	if (rotationDirection === Rotation.RIGHT) {
		return index === 0
			? imageIndexArray[imageIndexArray.length - 1]
			: checkPrev(movement, imageIndexArray, index);
	}

	return imageIndexArray.length - 1 === index ? 0 : checkNext(movement, imageIndexArray, index);
};

export const getDecrementalMovement = (currentMovement: number): number => {
	return currentMovement > 0 ? decrementMovement(0.3, currentMovement) : currentMovement;
};

export const getMaxMovement = (movement: number, max: number) => {
	return movement > max ? max : movement;
};
