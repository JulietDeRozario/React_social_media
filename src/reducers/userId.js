const userId = (state='', action) => {
  switch(action.type){
    case "ADDID" :
      console.log("id=" + (state + action.playload))
      return action.playload;
    default:
      return state;
  }
}

export default userId;