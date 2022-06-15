import { Component } from "react";
import styles from './Searchbar.module.css';

class Searchbar extends Component {
    state = {
        word: '',
    }

    handleChange = event => {
        const { name, value } = event.currentTarget;

        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit(this.state);

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