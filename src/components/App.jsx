import React, { useState, useEffect } from 'react';
import {ContactForm} from './ContactForm/ContactForm';
import {Filter} from './filter/filter';
import { ContactList } from './contacts/ContactList';
import { nanoid } from 'nanoid';


export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isContactExists = contacts.some(
      i =>
        i.name.toLowerCase() === contact.name.toLowerCase() &&
        i.number === contact.number
    );

    if (isContactExists) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(prevContacts => [contact, ...prevContacts]);
    }
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};
