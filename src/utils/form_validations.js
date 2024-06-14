export const isMobileNumber = mobile => {
  const pattern = /^\d{10}$/;

  return pattern.test(mobile);
};

export const isEmailAddress = email => {
  // const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const pattern = /\w+@\w+\.\w+/;
  return pattern.test(email);
};
