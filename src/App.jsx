import { Component } from "react";
// import { Notify } from "notiflix/build/notiflix-notify-aio";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import fetchImages from "./services/api";
import Button from "./components/Button/Button";

class App extends Component {
  state = {
    searchWord: "",
    page: 1,
    loading: false,
    images: [],
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchWord, page } = this.state;

    // if (images.length === 0) {
    //   return Notify.failure("There is no photo at your request");
    // }

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

  showButton = () => {
    const { loading } = this.state;
    if (loading) {
      return false;
    }
    return true;
    // if (items.length === totalHits) {
    //   return false;
    // }
    // if (totalHits > items.length) {
    //   return true;
    // }
  };

  render() {
    const { images, loading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {/* {error && <p>Whoops, something went wrong: {error.message}</p>} */}

        {loading && <p>Loading...</p>}

        <ImageGallery images={images} />

        {images.length !== 0 && loading !== true && (
          <Button onMoreClick={this.handleLoadMore} />
        )}
      </>
    );
  }
}

export default App;
