import { ContactsCollection } from '../db/models/Contact.js';

export const getAllContacts = async () => {
  const data = await ContactsCollection.find();
  return data;
};

export const getContactById = async (id) => {
  const data = await ContactsCollection.findById(id);
  return data;
};
