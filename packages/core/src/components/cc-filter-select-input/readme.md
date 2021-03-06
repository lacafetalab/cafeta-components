# cc-filter-select-input



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                       | Default          |
| --------------- | ---------------- | ----------- | -------------------------- | ---------------- |
| `IconRotate`    | `icon-rotate`    |             | `boolean`                  | `true`           |
| `bgField`       | `bg-field`       |             | `string`                   | `""`             |
| `border`        | `border`         |             | `boolean`                  | `true`           |
| `choices`       | --               |             | `any[]`                    | `undefined`      |
| `color`         | `color`          |             | `"primary" \| "secondary"` | `"primary"`      |
| `currentValue`  | `current-value`  |             | `string`                   | `""`             |
| `disabled`      | `disabled`       |             | `boolean`                  | `false`          |
| `error`         | `error`          |             | `boolean`                  | `false`          |
| `fieldReadonly` | `field-readonly` |             | `boolean`                  | `false`          |
| `helperText`    | `helper-text`    |             | `string`                   | `undefined`      |
| `iconName`      | `icon-name`      |             | `string`                   | `"chevron-down"` |
| `label`         | `label`          |             | `string`                   | `""`             |
| `loader`        | `loader`         |             | `boolean`                  | `false`          |
| `name`          | `name`           |             | `string`                   | `""`             |
| `placeholder`   | `placeholder`    |             | `string`                   | `""`             |
| `type`          | `type`           |             | `"checkbox"`               | `undefined`      |


## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `changeChoice` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [cc-wrapper-field](../cc-wrapper-field)
- [cc-icon](../cc-icon)
- [cc-input](../cc-input)
- [cc-checkfield](../cc-checkfield)

### Graph
```mermaid
graph TD;
  cc-filter-select-input --> cc-wrapper-field
  cc-filter-select-input --> cc-icon
  cc-filter-select-input --> cc-input
  cc-filter-select-input --> cc-checkfield
  cc-wrapper-field --> cc-loader
  cc-wrapper-field --> cc-icon
  cc-input --> cc-icon
  cc-checkfield --> cc-icon
  style cc-filter-select-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
