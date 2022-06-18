import { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    word: '',
  }

  handleFormSubmit = word => {
    this.setState({ word });
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery word={this.state.word} />
      </>
    )
  }
}

export default App;
