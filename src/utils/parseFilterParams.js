const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};

const parseIsFavourite = (isFavourite) => {
  if (isFavourite === 'true' || isFavourite === 'false') {
    return isFavourite;
  }

  return;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedType,
  };
};
