export const addUserId = (id) => {
  return {
    type: 'ADDID',
    playload: id
  }
}

export const addUsername = (username) => {
  return {
    type: 'ADDUSERNAME',
    playload: username
  }
}