export function convertNameAndLastNameToInitials(name, lastName) {
  return `${name?.charAt(0).toUpperCase()}${lastName?.charAt().toUpperCase()}`;
}

export function convertNameAndLastNameWordToUppercase(name, lastName) {
  return `${name?.charAt(0).toUpperCase()}${name?.slice(
    1
  )} ${lastName?.charAt(0).toUpperCase()}${lastName?.slice(1)}`;
}

export function concatUserNameToEmail(userName) {
  return `${userName}@ucr.ac.cr`;
}