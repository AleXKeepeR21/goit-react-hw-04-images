// import React, { Component } from 'react';
import SearchBar from './SearchBar/Searchbar';
import Modal from './Modal/Modal';
import fetchImage from './FetchImage/FetchImage';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import { useState, useEffect } from 'react';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  useEffect(() => {
    // query === ''
    if (!query) {
      setLoading(true);

      fetchImage(query, page)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        // .then(images => {
        //   if (page === 1) {
        //     setImages([...images.hits])
        //     return;
        //   } setImages(prev => [...prev, ...images.hits]);
        // })
        .then(images => setImages(images.hits))
        .catch(error => console.log(error))
        .finally(() => {
          setLoading(false);
          setPage(page + 1);
        });
    }
  }, [query, page]);

  const handleFormSubmit = query => {
    // if (query === query) {
    //   toast.error('You enter the same word!🦄 Enter new one!', {
    //     theme: 'colored',
    //   });
    // }

    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const loadMoreImages = () => {
    setLoading(true);
    fetchImage(query, page)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(images => setImages([...images, ...images.hits]))
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
        setPage(page + 1);
      });
  };

  const toggleModal = (modalImage, imageAlt) => {
    setShowModal(prevShowModal => !prevShowModal);
    setModalImage(modalImage);
    setImageAlt(imageAlt);
  };

  return (
    <div className={css.App}>
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery openModal={toggleModal} images={images} />
      <ToastContainer position="top-center" autoClose={4000} theme="colored" />
      {loading && <Loader />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImage} alt={imageAlt} />
        </Modal>
      )}
      {images.length >= 12 && <Button onClick={loadMoreImages} />}
    </div>
  );
}

// export class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     page: 1,
//     loading: false,
//     showModal: false,
//     modalImage: '',
//     imageAlt: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.query !== this.state.query) {
//       this.setState({ loading: true });

//       fetchImage(this.state.query, this.state.page)
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           }
//         })
//         .then(images => this.setState({ images: images.hits }))
//         .catch(error => this.setState({ error }))
//         .finally(() => {
//           this.setState({ loading: false });
//           this.setState(prevState => ({ page: prevState.page + 1 }));
//         });
//     }
//   }

//   handleFormSubmit = query => {
//     if (this.state.query === query) {
//       toast.error('You enter the same word!🦄 Enter new one!', {
//         theme: 'colored',
//       });
//     }
//     this.setState({
//       query,
//       page: 1,
//       images: [],
//     });
//   };

//   loadMoreImages = () => {
//     this.setState({ loading: true });
//     fetchImage(this.state.query, this.state.page)
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//       })
//       .then(images =>
//         this.setState({ images: [...this.state.images, ...images.hits] })
//       )
//       .catch(error => this.setState({ error }))
//       .finally(() => {
//         this.setState({ loading: false });
//         this.setState(prevState => ({ page: prevState.page + 1 }));
//       });
//   };

//   toggleModal = (modalImage, imageAlt) => {
//     this.setState(state => ({
//       showModal: !state.showModal,
//       modalImage,
//       imageAlt,
//     }));
//   };

//   render() {
//     const { showModal, loading, images, modalImage, imageAlt } = this.state;
//     return (
//       <div className={css.App}>
//         {/* {error && alert(`{error.massage}`)} */}
//         <SearchBar onSubmit={this.handleFormSubmit} />
//         <ImageGallery openModal={this.toggleModal} images={images} />
//         <ToastContainer
//           position="top-center"
//           autoClose={4000}
//           theme="colored"
//         />
//         {loading && <Loader />}
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={modalImage} alt={imageAlt} />
//           </Modal>
//         )}
//         {images.length >= 12 && <Button onClick={this.loadMoreImages} />}
//       </div>
//     );
//   }
// }
