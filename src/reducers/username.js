const username = (state='', action) => {
  switch(action.type){
    case "ADDUSERNAME" :
      return state + action.playload;
    default:
      return state;
  }
}

export default username;