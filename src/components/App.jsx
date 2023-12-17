import React, { useState } from 'react';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import contactsBook from '../data/contacts.json';
import useLocalStorage from 'hooks/useLocalStorage';

const LOCAL_KEY_CONTACTS = 'contacts';

const notifyOptions = {
  position: 'top-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export default function App() {
  const [contacts, setContacts] = useLocalStorage(
    LOCAL_KEY_CONTACTS,
    contactsBook
  );
  const [filter, setFilter] = useState('');

  const handlerResultChange = data => {
    const { name, number } = data;
    const validInput = contacts.some(function (element) {
      return (
        element.name.toLowerCase().trim() === name.toLowerCase().trim() ||
        element.number.trim() === number.trim()
      );
    });

    return validInput
      ? toast.info(
          `${name} or phone ${number}: is already in contacts `,
          notifyOptions
        )
      : setContacts([data, ...contacts]);
  };

  const handlerFilterChange = event => {
    setFilter(event.currentTarget.value.toLowerCase().trim());
  };

  const visibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const removeContact = id => {
    const result = contacts.filter(contact => contact.id !== id);
    setContacts(result);
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={handlerResultChange} />
      </Section>
      <Section title="Contacts">
        <Filter
          title="Find contacts by name"
          value={filter}
          onChange={handlerFilterChange}
        />
        <ToastContainer />
        <ContactList createList={visibleContacts()} onDelete={removeContact} />
      </Section>
    </>
  );
}
