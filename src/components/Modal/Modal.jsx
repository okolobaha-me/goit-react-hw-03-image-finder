import { ModalImage, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.closeModal);
  }

  render() {
    const { closeModal, alt, img } = this.props;

    return (
      <Overlay onClick={closeModal}>
        <ModalImage src={`${img}`} alt={`${alt}`} />
      </Overlay>
    );
  }
}

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};
