import { Contact } from './ContactForm';

export interface ContactListProps {
  createList: Partial<Contact>[];
  onDelete: (id: string) => void;
}
