import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import MDBehaviour from '../behaviours/material';
import i18next from 'i18next';

const BTN_JS = 'mdl-js-button';
const BTN_CLASS = 'mdl-button';
const BUTTON_PRFX = 'mdl-button--';
const RIPPLE_EFFECT = 'mdl-js-ripple-effect';

const propTypes = {
    color: PropTypes.oneOf([undefined,'colored', 'primary', 'accent']),
    id: PropTypes.string,
    handleOnClick: PropTypes.func, //to remove in V2
    hasRipple: PropTypes.bool,
    isJs: PropTypes.bool,
    icon: PropTypes.string,
    iconLibrary: PropTypes.oneOf(['material', 'font-awesome', 'font-custom']),
    label: PropTypes.string,
    onClick: PropTypes.func,
    shape: PropTypes.oneOf([undefined, 'raised', 'fab', 'icon', 'mini-fab']),
    type: PropTypes.oneOf(['submit', 'button']),
    disabled: PropTypes.oneOfType[PropTypes.string, PropTypes.bool],
    loading: PropTypes.bool
}

const defaultProps = {
    type: 'submit',
    shape: 'raised',
    label: '',
    icon: null,
    id: '',
    hasRipple: true,
    isJs: true,
    iconLibrary: 'material'
}

@MDBehaviour('materialButton', 'MaterialButton')
class DoubleActionButton extends Component {

    /**
    * Called when component is mounted.
    */
    componentDidMount() {
        const {hasRipple} = this.props;
        const refNode = ReactDOM.findDOMNode(this.refs['materialButton']);
        if (hasRipple) {
            componentHandler.upgradeElement(refNode, 'MaterialRipple');
        }
    }

    componentDidUpdate() {
        const spinnerNode = ReactDOM.findDOMNode(this.refs['double-action-button-spinner']);
        if(spinnerNode) {
            componentHandler.upgradeElement(spinnerNode, 'MaterialSpinner');
        }
    }

    /**
    * Date de composant.
    * @return {string} Classe.
    */
    _getComponentClassName() {
        const {shape, color, hasRipple, isJs} = this.props;
        let SHAPE_CLASS;

        switch (shape) {
            case 'raised':
                SHAPE_CLASS = `${BUTTON_PRFX}raised`;
                break;
            case 'fab':
                SHAPE_CLASS = `${BUTTON_PRFX}fab`;
                break;
            case 'icon':
                SHAPE_CLASS = `${BUTTON_PRFX}icon`;
                break;
            case 'mini-fab':
                SHAPE_CLASS = `${BUTTON_PRFX}mini-fab ${BUTTON_PRFX}fab`;
                break;
            case null:
                SHAPE_CLASS = '';
                break;
            default:
                SHAPE_CLASS = null;
                break;
        }

        const COLOR_CLASS = color ? `${BUTTON_PRFX}${color}` : '';
        const JS_CLASS = isJs ? BTN_JS : '';
        const RIPPLE_EFFECT_CLASS = hasRipple ? RIPPLE_EFFECT : '';
        return `${BTN_CLASS} ${COLOR_CLASS} ${SHAPE_CLASS} ${JS_CLASS} ${RIPPLE_EFFECT_CLASS}`;
    }

    /**
    * Render the pressed button.
    * @return {Component} - Component button.
    */
    renderPressedButton() {
        return (<button>Loading...</button>);
    }

    /**
    * Render an icon.
    * @return {Component} - Composant icone.
    */
    _renderIcon() {
        const {icon, iconLibrary} = this.props;
        switch (iconLibrary) {
            case 'material':
                return <i className='material-icons'>{icon}</i>;
            case 'font-awesome':
                const faCss = `fa fa-${icon}`;
                return <i className={faCss}></i>;
            case 'font-custom':
                return <span className={`icon-${icon}`}></span>;
            default:
                return null;
        }
    };

    /**
    * Render the label.
    * @return {Component} - Tle button label.
    */
    _renderLabel() {
        const {label, shape} = this.props;
        if (label && 'fab' !== shape && 'icon' !== shape && 'mini-fab' !== shape ) {
            return i18next.t(label);
        }
        return null;
    };

    /** inheritedDoc */
    render() {
        // attribute doc : https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button
        // be careful the way you declare your attribute names : https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button
        const {className, disabled, formNoValidate, handleOnClick, icon, id, onClick, type, label, style, hasRipple, isJs, iconLibrary, saving, ...otherProps } = this.props;
        const otherInputProps = { formNoValidate, onClick: handleOnClick ? handleOnClick : onClick, style, type, ...otherProps}; //on click for legacy. Remove handleOnClick in v2
        const renderedClassName = `${className ? className : ''} ${::this._getComponentClassName()}`.trim();

        return (
            <button alt={i18next.t(label)} onClick={this._handleOnClick} className={renderedClassName} disabled={saving} data-focus='button-action' id={id} title={i18next.t(label)} {...otherInputProps} ref='materialButton'>
                {!saving && icon && ::this._renderIcon()}
                {!saving && ::this._renderLabel()}
                {saving && <div className='mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active' data-focus='double-action-button-spinner' ref='double-action-button-spinner' ></div>}
            </button>
        );
    }
}

DoubleActionButton.displayName = 'DoubleActionButton'
DoubleActionButton.defaultProps = defaultProps;
DoubleActionButton.propTypes = propTypes;

export default DoubleActionButton;
