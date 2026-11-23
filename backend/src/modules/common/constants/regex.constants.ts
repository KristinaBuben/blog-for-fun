export const nameRegex = /^(?=[^\s].*[^\s]$)[A-Za-z0-9 .,'-\/]{5,100}$/;
export const nameRegexMessage =
  "must be 5-100 characters length, can contain characters of Latin origin, numerical characterts [0-9] and special characterts (.), (,), ('), (-), (/)";

export const emailRegex =
  /^(?=.{1,320}$)(?=.{1,64}@)(?!\s)([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\.[A-Za-z]{2,})$/;
export const emailRegexMessage =
  'Email must be a valid format and cannot contain spaces';

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/;
export const passwordRegexMessage =
  'Password must be between 8-25 characters length. Password must contain at least one uppercase, one lowercase, one digit, and one special character';
