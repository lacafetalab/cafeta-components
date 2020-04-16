import React from 'react';
import { attachEventProps } from './utils/attachEventProps';
export function createControllerComponent(displayName, controller) {
    const dismissEventName = `on${displayName}DidDismiss`;
    return class ReactControllerComponent extends React.Component {
        constructor(props) {
            super(props);
        }
        static get displayName() {
            return displayName;
        }
        async componentDidMount() {
            const { isOpen } = this.props;
            if (isOpen) {
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
            const { isOpen, onDidDismiss, ...cProps } = this.props;
            const elementProps = {
                ...cProps,
                [dismissEventName]: onDidDismiss,
            };
            this.controller = await controller.create({
                ...elementProps,
            });
            attachEventProps(this.controller, elementProps, prevProps);
            this.controller.present();
        }
        render() {
            return null;
        }
    };
}
//# sourceMappingURL=createControllerComponent.js.map