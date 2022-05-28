import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ imgList, toggleOpenModal, modalIsOpen }) => {
  return (
    <List className="gallery">
      {imgList.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            img={webformatURL}
            largeImg={largeImageURL}
            tags={tags}
            toggleOpenModal={toggleOpenModal}
            modalIsOpen={modalIsOpen}
          />
        );
      })}
    </List>
  );
};

ImageGallery.propTypes = {
  imgList: PropTypes.array.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  toggleOpenModal: PropTypes.func.isRequired,
};
