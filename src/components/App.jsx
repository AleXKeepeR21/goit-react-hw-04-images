import React, { Component } from 'react';
import SearchBar from './SearchBar/Searchbar';
import Modal from './Modal/Modal';
import fetchImage from './FetchImage/FetchImage';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    images: [],
    // index: null,
    page: 1,
    loading: false,
    showModal: false,
    // error: null,
    modalImage: '',
    imageAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ loading: true });

      fetchImage(this.state.query, this.state.page)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(images => this.setState({ images: images.hits }))
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.setState({ loading: false });
          this.setState(prevState => ({ page: prevState.page + 1 }));
        });
    }
  }

  handleFormSubmit = query => {
    if (this.state.query === query) {
      toast.error('You enter the same word!🦄 Enter new one!', {
        theme: 'colored',
      });
    }
    this.setState({
      query,
      page: 1,
      images: [],
    });
  };

  // loadMore = () => {
  //   this.setState({ loading: true });
  //   this.setState(prevState => ({ page: prevState.page + 1 }));
  // };

  loadMoreImages = () => {
    this.setState({ loading: true });
    fetchImage(this.state.query, this.state.page)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(images =>
        this.setState({ images: [...this.state.images, ...images.hits] })
      )
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ loading: false });
        this.setState(prevState => ({ page: prevState.page + 1 }));
      });
  };

  toggleModal = (modalImage, imageAlt) => {
    this.setState(state => ({
      showModal: !state.showModal,
      modalImage,
      imageAlt,
    }));
  };

  render() {
    const { showModal, loading, images, modalImage, imageAlt } = this.state;
    return (
      <div className={css.App}>
        {/* {error && alert(`{error.massage}`)} */}
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery openModal={this.toggleModal} images={images} />
        <ToastContainer
          position="top-center"
          autoClose={4000}
          theme="colored"
        />
        {loading && <Loader />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImage} alt={imageAlt} />
          </Modal>
        )}
        {images.length >= 12 && <Button onClick={this.loadMoreImages} />}
      </div>
    );
  }
}
