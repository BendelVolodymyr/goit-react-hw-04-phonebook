export type Contact = {
  id: string;
  name: string;
  number: string;
};

export interface ContactFormProps {
  onSubmit: (contact: Contact) => void;
}
