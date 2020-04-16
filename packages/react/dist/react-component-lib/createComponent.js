import React from 'react';
import ReactDom from 'react-dom';
import { attachEventProps, createForwardRef, dashToPascalCase, isCoveredByReact, } from './utils/index';
export const createReactComponent = (tagName) => {
    const displayName = dashToPascalCase(tagName);
    const ReactComponent = class extends React.Component {
        constructor(props) {
            super(props);
        }
        componentDidMount() {
            this.componentDidUpdate(this.props);
        }
        componentDidUpdate(prevProps) {
            const node = ReactDom.findDOMNode(this);
            attachEventProps(node, this.props, prevProps);
        }
        render() {
            const { children, forwardedRef, style, className, ref, ...cProps } = this.props;
            const propsToPass = Object.keys(cProps).reduce((acc, name) => {
                if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
                    const eventName = name.substring(2).toLowerCase();
                    if (isCoveredByReact(eventName)) {
                        acc[name] = cProps[name];
                    }
                }
                return acc;
            }, {});
            const newProps = {
                ...propsToPass,
                ref: forwardedRef,
                style,
                className,
            };
            return React.createElement(tagName, newProps, children);
        }
        static get displayName() {
            return displayName;
        }
    };
    return createForwardRef(ReactComponent, displayName);
};
//# sourceMappingURL=createComponent.js.map