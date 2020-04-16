import React from 'react';
import ReactDOM from 'react-dom';
import { attachEventProps } from './utils/attachEventProps';
export function createOverlayComponent(displayName, controller) {
    const dismissEventName = `on${displayName}DidDismiss`;
    return class ReactOverlayComponent extends React.Component {
        constructor(props) {
            super(props);
            this.el = document.createElement('div');
        }
        static get displayName() {
            return displayName;
        }
        componentDidMount() {
            if (this.props.isOpen) {
                this.present();
            }
        }
        async componentDidUpdate(prevProps) {
            if (prevProps.isOpen !== this.props.isOpen && this.props.isOpen === true) {
                this.present(prevProps);
            }
            if (this.controller &&
                prevProps.isOpen !== this.props.isOpen &&
                this.props.isOpen === false) {
                await this.controller.dismiss();
            }
        }
        async present(prevProps) {
            // tslint:disable-next-line:no-empty
            const { children, isOpen, onDidDismiss = () => { }, ...cProps } = this.props;
            const elementProps = {
                ...cProps,
                [dismissEventName]: onDidDismiss,
            };
            this.controller = await controller.create({
                ...elementProps,
                component: this.el,
                componentProps: {},
            });
            attachEventProps(this.controller, elementProps, prevProps);
            this.controller.present();
        }
        render() {
            return ReactDOM.createPortal(this.props.children, this.el);
        }
    };
}
//# sourceMappingURL=createOverlayComponent.js.map