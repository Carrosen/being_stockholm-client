const initialState = {
  sidebarVisible: false,
  legendVisible: false,
}

const animationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SIDEBAR_VISIBILITY':
      return {
        sidebarVisible: !state.sidebarVisible
      }
    case 'CHANGE_LEGEND_VISIBILITY':
      return {
        legendVisible: !state.legendVisible
      }
    case 'CREATE_IMAGE_POST':
      return {
        renderCreate: true
      }
    case 'CLOSE_IMAGE_POST':
      return {
        renderCreate: false
      }
    default:
      return state
  }
}

export default animationReducer