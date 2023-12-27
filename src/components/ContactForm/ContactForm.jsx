import React, { Component } from 'react';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleAddContact = evt => {
    evt.preventDefault();

    this.props.getNewContact(this.state);

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleAddContact}>
        <label>
          Enter your name:
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            value={this.state.name}
            required
          />
        </label>

        <label>
          Enter your number:
          <input
            onChange={this.handleChange}
            type="tel"
            name="number"
            value={this.state.number}
            required
          />
        </label>

        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
