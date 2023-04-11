import { nanoid } from 'nanoid';
import initialContacts from '../data/contacts.json';
import ContactForm from './contact_form/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contact_list/ContactList';
import { ContainerSettings } from './container_settings/ConteinerSettings.style';
import { useState, useEffect } from 'react';

const savedContacts =
  JSON.parse(localStorage.getItem('contacts')) || initialContacts;

export const App = () => {
  const [contacts, setContacts] = useState(() => savedContacts);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    !contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? setContacts(prevContacts => [
          ...prevContacts,
          { id: nanoid(), name: name, number: number },
        ])
      : alert(`${name} is already in contacts`);
  };

  const handleChange = value => {
    setFilter(value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId.id)
    );
  };

  const getFilterContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <>
      <ContainerSettings>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>
        <Filter onChange={handleChange} />
      </ContainerSettings>
      <ContactList contacts={getFilterContacts()} onDelete={deleteContact} />
    </>
  );
};
