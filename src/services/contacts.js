import { ContactsCollection } from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  userId,
  page,
  perPage,
  sortBy,
  sortOrder,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let contactsQuery = ContactsCollection.find({ userId });

  Object.keys(filter).forEach((field) => {
    const value = filter[field];
    if (value !== undefined) {
      contactsQuery = contactsQuery.where(field).equals(value);
    }
  });

  const ContactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(ContactsCount, perPage, page);

  return { data: contacts, ...paginationData };
};

export const getContactById = async (userId, id) => {
  const data = await ContactsCollection.findOne({ _id: id, userId });
  return data;
};

export const createContact = async (payload, userId) => {
  const data = await ContactsCollection.create({ ...payload, userId });
  return data;
};

export const patchContact = async (userId, id, payload, options = {}) => {
  const data = await ContactsCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!data || !data.value) return null;

  return data.value;
};

export const deleteContact = async (userId, id) => {
  const data = await ContactsCollection.findOneAndDelete({ _id: id, userId });

  return data;
};
