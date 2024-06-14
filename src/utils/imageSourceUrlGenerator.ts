export const generateImageSourceUrls = (
	count: number,
	baseUrl: string,
	sourceJsonMask: string,
	replacementElement = 'xx'
): string[] => {
	return Array.from({ length: count }, (_, i) => i + 1).map((i): string => {
		const jsonMask = sourceJsonMask.replace(replacementElement, `${i.toString().padStart(2, '0')}`);

		return baseUrl + jsonMask;
	});
};
