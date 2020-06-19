# cc-dropdown-new



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                       | Default     |
| --------------- | ---------------- | ----------- | -------------------------- | ----------- |
| `IconRotate`    | `icon-rotate`    |             | `boolean`                  | `true`      |
| `bgField`       | `bg-field`       |             | `string`                   | `""`        |
| `border`        | `border`         |             | `boolean`                  | `true`      |
| `color`         | `color`          |             | `"primary" \| "secondary"` | `"primary"` |
| `disabled`      | `disabled`       |             | `boolean`                  | `false`     |
| `error`         | `error`          |             | `boolean`                  | `false`     |
| `fieldReadonly` | `field-readonly` |             | `boolean`                  | `false`     |
| `helperText`    | `helper-text`    |             | `string`                   | `undefined` |
| `iconName`      | `icon-name`      |             | `string`                   | `undefined` |
| `iconOnly`      | `icon-only`      |             | `boolean`                  | `false`     |
| `isActive`      | `is-active`      |             | `boolean`                  | `false`     |
| `isFocus`       | `is-focus`       |             | `boolean`                  | `false`     |
| `loader`        | `loader`         |             | `boolean`                  | `false`     |


## Dependencies

### Used by

 - [cc-filter-select-input](../cc-filter-select-input)
 - [cc-single-select-input](../cc-single-select-input)

### Depends on

- [cc-loader](../cc-loader)
- [cc-icon](../cc-icon)

### Graph
```mermaid
graph TD;
  cc-wrapper-field --> cc-loader
  cc-wrapper-field --> cc-icon
  cc-filter-select-input --> cc-wrapper-field
  cc-single-select-input --> cc-wrapper-field
  style cc-wrapper-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
