import React, { useEffect, useRef, useState } from 'react';
import { Rotation } from '../../interfaces';
import { chooseIndex, getDecrementalMovement, getMaxMovement } from '../../utils';
import { pixelsPerDegree } from '../../config/viewer360.config';

interface Viewer360State {
	imageIndex: number;
	dragStartIndex: number;
	autoMove: boolean;
	rotationDirection: Rotation;
	movement: number;
	dragStart: number | undefined;
	movementSpeed: number;
	timmy: number;
}

interface Props {
	images: string[];
	autoMove: boolean;
	initialMovement?: number;
	maxMovement?: number;
	imageClassName?: string;
	className?: string;
	fps?: number;
}

export const Viewer360: React.FC<Props> = ({
	autoMove: initialAutoMove = false,
	images = [],
	initialMovement: initialMovementSpeed = 1,
	maxMovement = 20,
	className: _className,
	imageClassName: _imageClassName,
	fps = 60,
}) => {
	const defaultValues: Viewer360State = {
		autoMove: initialAutoMove,
		dragStart: undefined,
		dragStartIndex: 0,
		imageIndex: 0,
		movement: 0,
		movementSpeed: initialMovementSpeed,
		rotationDirection: Rotation.LEFT,
		timmy: 0,
	};

	const frameID = useRef<DOMHighResTimeStamp | undefined>(undefined);
	const dragging = useRef<boolean>(false);
	const mobileTouch = useRef<Touch | undefined>();

	const [state, setState] = useState(defaultValues);

	const {
		autoMove,
		dragStart,
		dragStartIndex,
		imageIndex,
		movement,
		movementSpeed,
		rotationDirection,
		timmy,
	} = state;

	let className = 'viewer-360';
	let imageClassName = 'viewer-360-image';

	if (_className) {
		className = `${className} ${_className}`;
	}

	if (_imageClassName) {
		imageClassName = `${imageClassName} ${_imageClassName}`;
	}

	const handleMouseMove = (e: MouseEvent | TouchEvent) => {
		{
			if (dragging.current) {
				if (e instanceof TouchEvent) {
					const touch = e.touches[0];
					updateImageIndex(touch.screenX, touch.pageX - (mobileTouch.current?.pageX ?? 0));
					mobileTouch.current = touch;
				} else {
					updateImageIndex(e.screenX, e.movementX);
				}
			}
		}
	};

	const handleMouseUp = () => {
		dragging.current = false;
		setState((prev) => ({
			...prev,
			autoMove: initialAutoMove,
		}));
	};

	useEffect(() => {
		initializeAutoRotate();

		document.addEventListener('mousemove', handleMouseMove, false);
		document.addEventListener('mouseup', handleMouseUp, false);
		document.addEventListener('touchmove', handleMouseMove, false);
		document.addEventListener('touchend', handleMouseUp, false);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove, false);
			document.removeEventListener('mouseup', handleMouseUp, false);
			document.removeEventListener('touchmove', handleMouseMove, false);
			document.removeEventListener('touchend', handleMouseUp, false);
			if (frameID?.current) {
				cancelAnimationFrame(frameID.current!);
			}
		};
	}, []);

	useEffect(() => {
		if (!autoMove && frameID.current) {
			cancelAnimationFrame(frameID.current!);
			frameID.current = undefined;
		}

		if (autoMove) {
			if (frameID.current) {
				cancelAnimationFrame(frameID.current);
			}
			frameID.current = undefined;
			initializeAutoRotate();
		}
	}, [autoMove, initialAutoMove, initialMovementSpeed, movement, movementSpeed]);

	const initializeAutoRotate = () => {
		let then = performance.now();
		const interval = 1000 / fps;

		const changeIndex = (rafTimmy: number) => {
			const delta = rafTimmy - then;

			if (images.length && delta > interval) {
				then = rafTimmy - (delta % interval);
				if (!timmy || rafTimmy - timmy >= movementSpeed) {
					const imageIndexArray = images.map((_, idx) => idx);

					setState((prev) => {
						const index = imageIndexArray.indexOf(prev.imageIndex);

						return {
							...prev,
							timmy: rafTimmy,
							imageIndex: chooseIndex(
								imageIndexArray,
								index,
								rotationDirection,
								Math.round(movement)
							),
							movement: getDecrementalMovement(prev.movement),
						};
					});
				}
			}
			frameID.current = requestAnimationFrame(changeIndex);
		};
		changeIndex(frameID.current!);
	};

	const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
		e.persist();
		const screenXPoint = () => {
			if ('touches' in e) {
				return e.touches[0].screenX;
			}
			return e.screenX;
		};

		dragging.current = true;
		setState((prev) => ({
			...prev,
			dragStart: screenXPoint(),
			autoMove: false,
			dragStartIndex: imageIndex,
		}));
	};

	const updateImageIndex = (currentPosition: number, movement: number) => {
		const numImages = images.length;
		const pixelsPerImage = pixelsPerDegree * (numImages / numImages);
		const dx = (-currentPosition + (dragStart ?? 0)) / pixelsPerImage;
		let index = Math.floor(dx) % numImages;

		if (index < 0) {
			index = numImages + index - 1;
		}

		index = (index + dragStartIndex) % numImages;
		if (index !== imageIndex && images[index]) {
			setState((prev) => ({
				...prev,
				imageIndex: index,
				rotationDirection: dx < 0 ? Rotation.RIGHT : Rotation.LEFT,
				movement: getMaxMovement(Math.abs(movement), maxMovement),
			}));
		}
	};

	const preventDragHandler = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const renderImage = () => {
		return (
			<img
				className={imageClassName}
				alt={`viewer-360-image-${imageIndex}`}
				src={images[imageIndex]}
			/>
		);
	};

	return (
		<div
			className={className}
			onMouseDown={handleMouseDown}
			onTouchStart={handleMouseDown}
			onDragStart={preventDragHandler}
		>
			{renderImage()}
		</div>
	);
};
