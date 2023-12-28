import React, { useState } from 'react';
import css from './ContactForm.module.css';

export const ContactForm = ({ getNewContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        console.warn(`There is no input with name: ${name}`);
    }
  };

  const handleAddContact = evt => {
    evt.preventDefault();

    getNewContact({ name, number });

    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleAddContact}>
      <label>
        Enter your name:
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={name}
          required
        />
      </label>

      <label>
        Enter your number:
        <input
          onChange={handleChange}
          type="tel"
          name="number"
          value={number}
          required
        />
      </label>

      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
