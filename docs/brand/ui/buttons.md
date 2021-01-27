# Buttons
FAF buttons are blocky, funky and boxy, just like our Fast Assembled Furniture!
They are minimal and attractive and thank to their icons, it is easy to understand their purpose.
Finally, their color-coding ensure that main actions are easily distinguishable from secondary ones. 

## Usage
```js
import { Button } from '../path/to/SquareButton'

export default () => (
    <Button type="button">Click me!</Button>
)

```

## Props
| Prop      | Type                            | Description                         |
|-----------|---------------------------------|-------------------------------------|
| children  | React children                  | The content of the button           |
| className | string                          | The additional styles of the button |
| type      | "button" \| "submit" \| "reset" | The HTML type of the button to use  |
