# Viewer 360 - React TypeScript Component

Welcome to the Viewer 360 project! This component allows users to rotate an image 360 degrees, providing an interactive experience. The component is built using React and TypeScript, ensuring a robust and type-safe implementation.

## Features

- **360-degree rotation**: Users can drag the image to rotate it in all directions.
- **Responsive**: Works well on both desktop and mobile devices.
- **Easy to integrate**: Simple API for quick integration into your React projects.
- **Customizable**: Options for configuring speed, direction, and other parameters.

## Installation

To install Viewer 360, you can use npm or yarn:

```bash
npm install viewer-360
```
or
```bash
yarn add viewer-360
```

# Usage

Here is a basic example of how to use the Viewer 360 component in your React project:

```tsx
import React from 'react';
import Viewer360 from 'viewer-360';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>360° Image Viewer</h1>
      <Viewer360
        images={[
          'path/to/image1.jpg',
          'path/to/image2.jpg',
          'path/to/image3.jpg',
          // Add all image paths here
        ]}
        automove={true}
        initialMovement={1}
        maxMovement={20}
      />
    </div>
  );
};

export default App;
```


| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| images | string[] | [] | 	Array of image URLs to be used in the viewer |
| automove | boolean | false | If the value is true, the image will rotate automatically 360 degrees |
| initialMovement | number | 1 | The initial speed when rotating the image |
| maxMovement | number | 20 | The max speed of movement |

# Development

To contribute to the development of Viewer 360, follow these steps:
1. Clone the repository:

```bash
git clone https://github.com/ilyaistomin789/viewer360
```

2. Install dependencies:

```bash
cd viewer-360
npm install
```

3. Run the development server:

```bash
npm start
```

# Contact

For any questions or feedback, please reach out to the project maintainer at stmnl.dev@gmail.com
