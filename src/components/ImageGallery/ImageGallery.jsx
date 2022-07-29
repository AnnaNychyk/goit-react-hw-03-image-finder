import { Component } from "react";

class ImageGallery extends Component {
    state = {
        word: null,
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.word !== this.props.word) {
            console.log('Change enter word')
            console.log('this.props.word: ', this.props.word);


            fetch(`https://pixabay.com/api/?q=${this.props.word}&page=1&key=25809768-5f151ed3e9c60947c53759114&image_type=photo&orientation=horizontal&per_page=12`).then(response => response.json()).then(
                // console.log
                word => this.setState({word})
            );
        }
    }

    render() {
        return (
            <div>
                {this.state.word && <p>{this.state.word.totalHits}</p>}
            </div>
        )
    }
}

export default ImageGallery;
