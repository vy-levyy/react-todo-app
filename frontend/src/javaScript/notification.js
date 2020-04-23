const notification = {
  success(description) {
    return {
      description,
      status: 'success'
    }
  },

  error(description) {
    return {
      description,
      status: 'danger'
    }
  }
}

export default notification;
