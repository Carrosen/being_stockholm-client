const initialState = {
  sidebarVisible: false,
  legendVisible: false,
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        uid: ''
      },
    },
  },
}

export default initialState