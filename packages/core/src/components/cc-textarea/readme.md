# cc-textarea



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description | Type                             | Default     |
| -------------- | -------------- | ----------- | -------------------------------- | ----------- |
| `color`        | `color`        |             | `"primary" \| "secondary"`       | `"primary"` |
| `disabled`     | `disabled`     |             | `boolean`                        | `false`     |
| `enableImage`  | `enable-image` |             | `boolean`                        | `undefined` |
| `error`        | `error`        |             | `boolean`                        | `false`     |
| `helperText`   | `helper-text`  |             | `string`                         | `undefined` |
| `imageService` | --             |             | `(file: any) => Promise<string>` | `undefined` |
| `label`        | `label`        |             | `string`                         | `undefined` |
| `maxLength`    | `max-length`   |             | `number`                         | `undefined` |
| `name`         | `name`         |             | `string`                         | `undefined` |
| `placeholder`  | `placeholder`  |             | `string`                         | `undefined` |
| `rich`         | `rich`         |             | `boolean`                        | `false`     |
| `success`      | `success`      |             | `boolean`                        | `false`     |
| `value`        | `value`        |             | `string`                         | `undefined` |


## Events

| Event        | Description | Type                  |
| ------------ | ----------- | --------------------- |
| `changeText` |             | `CustomEvent<string>` |


## Methods

### `focusTextEditor() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setDataRichEditor(data: string) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
