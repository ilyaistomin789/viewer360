import type { Meta, StoryObj } from '@storybook/react';
import { Viewer360 } from './Viewer360';
import { generateImageSourceUrls } from '../../utils/imageSourceUrlGenerator';

const images = generateImageSourceUrls(
	72,
	'https://iconasys.com/Downloads/360/kors-watch-360-final/imglarge/',
	'Kors-watch-360-photography-1500-0xx.jpg',
	'xx'
);
const meta = {
	title: 'Components/Viewer360',
	component: Viewer360,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		maxMovement: 20,
		autoMove: false,
		images,
	},
} satisfies Meta<typeof Viewer360>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAutoMove: Story = {
	args: {
		autoMove: true,
		maxMovement: 20,
	},
};

export const WithoutAutoMove: Story = {
	args: {
		autoMove: false,
	},
};

export const ParameterizedSpeed: Story = {
	args: {
		autoMove: true,
		maxMovement: 30,
	},
};
