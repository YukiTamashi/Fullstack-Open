const Notification = ({notification}) => {
    const ErrorStyle = {
        color: 'red',
        backgroundColor: 'light-grey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const OkStyle = {
        color: 'green',
        backgroundColor: 'light-grey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (notification.type === 'Ok'){
      return (
        <div style={OkStyle}>
          {notification.message}
        </div>
      )
    }
    else if (notification.type === 'Error'){
      return (
        <div style={ErrorStyle}>
          {notification.message}
        </div>
      )
    }
    else{
        return null
    }
}

export default Notification