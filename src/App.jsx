import { Component } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import fetchImages from "./services/api";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";

class App extends Component {
  state = {
    searchWord: "",
    page: 1,
    loading: false,
    images: [],
    error: null,
    showModal: false,
    largeImageURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchWord, page } = this.state;

    //  if (this.state.images === []) {
    //    return Notify.failure(
    //      "Sorry, there are no images matching your search query."
    //    );
    //  }

    if (prevState.searchWord !== searchWord || prevState.page !== page) {
      this.setState({ loading: true });

      fetchImages(this.state)
        .then((res) => {
          const images = [...this.state.images, ...res.hits];
          this.setState({ images });
        })
        .catch((res) => {
          console.log(res);
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = (searchWord) => {
    this.setState({
      searchWord,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, loading, showModal, tags } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {loading && <Loader />}

        <ImageGallery images={images} onOpenModal={this.toggleModal} />

        {images.length !== 0 && loading !== true && (
          <Button onMoreClick={this.handleLoadMore} />
        )}

        {showModal && (
          <Modal
            largeImageURL={images.largeImageURL}
            tags={tags}
            onCloseModal={this.toggleModal}
          ></Modal>
        )}
      </>
    );
  }
}

export default App;
