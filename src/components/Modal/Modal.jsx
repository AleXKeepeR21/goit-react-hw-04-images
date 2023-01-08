// import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from '../Modal/Modal.module.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default function Modal(onClose, children) {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', this.handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = evt => {
//     if (evt.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleOverlayClick = evt => {
//     if (evt.currentTarget === evt.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={css.overlay} onClick={this.handleOverlayClick}>
//         <div className={css.modal}>{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
