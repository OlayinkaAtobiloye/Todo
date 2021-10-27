const initialState = {
    activePage: "all",
    allTasks: localStorage.getItem('AllTasks') ? localStorage.getItem('AllTasks') : null
}

const Reducer = (state=initialState, action) => {
    switch(action.type){
        case "activePage":
            return{
                ...state,
                activePage: action.activePage
            }
        // case "saveAllTasks":
        //     localStorage.setItem()

    }
        

    return{
        ...state
    }
}

export default Reducer;