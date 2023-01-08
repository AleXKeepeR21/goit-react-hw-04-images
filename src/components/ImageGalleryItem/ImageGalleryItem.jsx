import PropTypes from 'prop-types';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ smallImg, largeImg, alt, openModal }) => {
  return (
    <li
      className={css.imageGalleryItem}
      onClick={() => openModal(largeImg, alt)}
    >
      <img className={css.imageGalleryItemImage} src={smallImg} alt={alt} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
