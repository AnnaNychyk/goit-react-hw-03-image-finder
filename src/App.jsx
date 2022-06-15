import { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';

class App extends Component {
  state = {
    
  }

  handleFormSubmit = data => {
    console.log(data);
    // this.setState({searchWord: event.currentTarget.value.toLowerCase()})
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
      </>
    )
  }
}

export default App;
