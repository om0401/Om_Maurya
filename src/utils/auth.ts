// Owner credentials
export const OWNER_CREDENTIALS = {
  name: 'Om Maurya',
  password: '04092001@Om'
};

export const isOwner = (name: string, password: string): boolean => {
  return name === OWNER_CREDENTIALS.name && password === OWNER_CREDENTIALS.password;
};
