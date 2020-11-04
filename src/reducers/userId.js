const userId = (state='', action) => {
  switch(action.type){
    case "ADDID" :
      console.log("id=" + (state + action.playload))
      return state + action.playload;
    default:
      return state;
  }
}

export default userId;