const userId = (state='', action) => {
  switch(action.type){
    case "ADDID" :
      return action.playload;
    default:
      return state;
  }
}

export default userId;