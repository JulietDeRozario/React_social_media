const username = (state='', action) => {
  switch(action.type){
    case "ADDUSERNAME" :
      console.log("username=" + (state + action.playload))
      return state + action.playload;
    default:
      return state;
  }
}

export default username;