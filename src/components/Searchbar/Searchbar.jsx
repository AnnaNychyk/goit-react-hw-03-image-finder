import { Component } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
    state = {
        word: '',
    }

    handleChange = event => {
        this.setState({ word: event.currentTarget.value.toLowerCase() });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.word.trim() === '') {
            return Notify.warning('Please enter any word');
        }

        this.props.onSubmit(this.state.word);
        this.setState({ word: '' });
    };


    render() {
        return (
            <header className={styles.searchbar}>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={styles.button}>
                        <span className={styles.buttonLabel}>Search</span>
                    </button>

                    <input
                        onChange={this.handleChange}
                        name="word"
                        value={this.state.word}
                        className={styles.input}
                        type="text"
                        // autocomplete="off"
                        // autofocus
                        // placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}

export default Searchbar;