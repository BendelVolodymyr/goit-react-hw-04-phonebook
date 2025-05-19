import React, { useState } from 'react';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import {
  ToastContainer,
  ToastOptions,
  ToastPosition,
  toast,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import contactsBook from '../data/contacts.json';
import useLocalStorage from 'hooks/useLocalStorage';
import { Contact } from 'type/ContactForm';

const LOCAL_KEY_CONTACTS = 'contacts';

const notifyOptions: ToastOptions = {
  position: 'top-left' as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export default function App() {
  const [contacts, setContacts] = useLocalStorage<Contact[]>(
    LOCAL_KEY_CONTACTS,
    contactsBook
  );
  const [filter, setFilter] = useState<string>('');

  const handlerResultChange = (data: Contact) => {
    const { name, number } = data;

    const isDuplicate = contacts.some(
      contact =>
        contact.name.toLowerCase().trim() === name.toLowerCase().trim() ||
        contact.number.trim() === number.trim()
    );

    if (isDuplicate) {
      toast.info(
        `${name} or phone ${number}: is already in contacts `,
        notifyOptions
      );
      return;
    }

    setContacts([data, ...contacts]);
  };

  const handlerFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value.toLowerCase().trim());
  };

  const visibleContacts = (): Contact[] => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const removeContact = (id: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
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
