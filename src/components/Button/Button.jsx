import css from '../Button/Button.module.css';
import PropTypes from 'prop-types';

export function Button({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={css.button}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};
