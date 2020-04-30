# cc-dropdown



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description | Type                               | Default                          |
| --------------- | ----------------- | ----------- | ---------------------------------- | -------------------------------- |
| `bgField`       | `bg-field`        |             | `string`                           | `""`                             |
| `border`        | `border`          |             | `boolean`                          | `true`                           |
| `choices`       | --                |             | `any[]`                            | `undefined`                      |
| `color`         | `color`           |             | `"primary" \| "secondary"`         | `"primary"`                      |
| `currentValue`  | `current-value`   |             | `string`                           | `""`                             |
| `disabled`      | `disabled`        |             | `boolean`                          | `false`                          |
| `error`         | `error`           |             | `boolean`                          | `false`                          |
| `fieldReadonly` | `field-readonly`  |             | `boolean`                          | `false`                          |
| `helperText`    | `helper-text`     |             | `string`                           | `undefined`                      |
| `iconName`      | `icon-name`       |             | `string`                           | `"chevron-down"`                 |
| `iconOnly`      | `icon-only`       |             | `boolean`                          | `false`                          |
| `label`         | `label`           |             | `string`                           | `""`                             |
| `loader`        | `loader`          |             | `boolean`                          | `false`                          |
| `name`          | `name`            |             | `string`                           | `""`                             |
| `noChoicesText` | `no-choices-text` |             | `string`                           | `"No se encontraron opciones"`   |
| `noResultsText` | `no-results-text` |             | `string`                           | `"No se encontraron resultados"` |
| `placeholder`   | `placeholder`     |             | `string`                           | `""`                             |
| `type`          | `type`            |             | `"multiple" \| "single" \| "text"` | `"single"`                       |


## Events

| Event           | Description | Type               |
| --------------- | ----------- | ------------------ |
| `changeChoice`  |             | `CustomEvent<any>` |
| `clickDropdown` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- choicesjs-stencil
- [cc-loader](../cc-loader)
- [cc-icon](../cc-icon)

### Graph
```mermaid
graph TD;
  cc-dropdown --> choicesjs-stencil
  cc-dropdown --> cc-loader
  cc-dropdown --> cc-icon
  style cc-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
