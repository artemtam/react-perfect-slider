# react-perfect-slider ![Build Workflow](https://github.com/artemtam/react-perfect-slider/actions/workflows/main.yml/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/artemtam/react-perfect-slider/badge.svg?branch=beta)](https://coveralls.io/github/artemtam/react-perfect-slider)

High-efficient and perfectly designed carousel/slider component.

## Features

- Simple, clean, not over-engineered
- No default styling and controlling components
- Hardware-accelerated transitions with CSS Transform
- Zero-dependencies, React and TypeScript
- Glitchless on mobile devices

## Usage

Add `react-perfect-slider` to your project running the following in your project folder:

```shell script
npm i react-perfect-slider
```

Import Slider component and necessary styles:

```typescript jsx
import Slider from 'react-perfect-slider';
```

Just pass all slides as children and add necessary controls:

```typescript jsx
<Slider renderControls={(next, previous) => [
    <button onClick={previous}>Previous</button>,
    <button onClick={next}>Next</button>
]}>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
</Slider>
```

## API

The single `Slider` component has the following properties:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `transitionDuration` | `number` | `1000` | Slide transition duration in milliseconds  |
| `transitionFunction` | `string` | `ease` | Slide transition function (ease, ease-in-out, ect.)  |
| `autoplay` | `boolean` | `true` | Autoplay mode active |
| `autoplayDuration` | `number` | `5000` | Interval for autoplay iteration |
| `renderControls` | `Function` | `() => null` | Callback is used to render controlling components, such as next and previous buttons, slider indicator dots, etc. More details below |

### renderControls

```typescript jsx
renderControls?: (
    next: () => void, // navigate to the next slide
    previous: () => void, // navigate to the previous slide
    goTo: (slide: number) => void, // navigate to the specified slide
    slide: number,  // current slide index
    total: number, // total number of slides
  ) => React.ReactNode | React.ReactNodeArray;
```
Use this callback to render all necessary controlling components, such as next/previous arrows, slider indicator dots, etc. For example, to render Next and Previous button write the following:

```typescript jsx
<Slider renderControls={(next, previous) => [
    <button onClick={previous}>Previous</button>,
    <button onClick={next}>Next</button>
]} />
```

You can place these components relatively to the Slider container – just make each component's position `absolute`.

## Contribution

There are still some things to implement, such as touch support and accessibility So feel free to contribute to the project, and use issues to share feedback.
