import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ imgList, toggleOpenModal }) => {
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
          />
        );
      })}
    </List>
  );
};

ImageGallery.propTypes = {
  imgList: PropTypes.array.isRequired,
  toggleOpenModal: PropTypes.func.isRequired,
};
