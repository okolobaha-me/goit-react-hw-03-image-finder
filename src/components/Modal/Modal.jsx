import { ModalImage, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ img, closeModal, alt }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  });

  return (
    <Overlay onClick={closeModal}>
      <ModalImage src={`${img}`} alt={`${alt}`} />
    </Overlay>
  );
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};
