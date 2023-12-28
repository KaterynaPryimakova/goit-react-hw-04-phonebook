import React, { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

const CONTACTS = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(CONTACTS)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const updateState = newContact => {
    const alreadyExist = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (alreadyExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    setContacts(prevState => [...prevState, { ...newContact, id: nanoid() }]);
  };

  const handleFindContact = e => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = contactId => {
    const filteredContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    setContacts(filteredContacts);
  };

  const getFilteredContacts = () => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
        contact.number.includes(filter)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm title="Phonebook" getNewContact={updateState} />

      <h2>Contacts</h2>
      <Filter findContact={handleFindContact} filter={filter} />
      <ContactList
        title="Contacts"
        contacts={getFilteredContacts()}
        deleteContact={handleDeleteContact}
      />
    </div>
  );
};
