import { ContactListProps } from 'type/ContactList';
import styled from './ContactList.module.scss';

const ContactList: React.FC<ContactListProps> = ({ createList, onDelete }) => {
  const newList = createList.map(({ id, name, number }) => {
    return (
      <li key={id}>
        <span>{name}:</span>
        <span>{number}</span>
        <button
          className={styled['contact__button']}
          type="button"
          onClick={() => onDelete(id!)}
        >
          Delete
        </button>
      </li>
    );
  });
  return <ul className={styled['contact']}>{newList}</ul>;
};

export default ContactList;
