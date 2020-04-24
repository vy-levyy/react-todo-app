import React from 'react';
import ReactDOM from 'react-dom';
import NotificationListItem from '../NotificationListItem/NotificationListItem.jsx';
import './style.css';

class NotificationList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    }


  }
  
  static lastId = 0;
  static timerIds = [];

  componentDidMount() {

    window.addEventListener("resize", this.processList.bind(this));
    this.processList();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.children !== null) {
      this.addItem(newProps.children);
      this.processList();
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    clearTimeout(NotificationList.timerIds);
  }

  addItem(item) {
    let {list} = this.state;

    list.unshift({
      html: (
        <NotificationListItem
          className="row"
          status={item.status}
          key={NotificationList.lastId}
        >
          {item.description}
        </NotificationListItem>
      ),
      shouldShow: true
    });

    NotificationList.lastId += 1;

    this.setState({list});
    this.removeItem();
  }

  removeItem() {
    const timerId = setTimeout(() => {
      let {list} = this.state;

      list.pop();

      this.setState({list});
    }, 3000);

    NotificationList.timerIds.push(timerId);
  }

  processList() {
    if (window.innerWidth < 1024) {
      let {list} = this.state;

      if (list.length > 0) {
        list = list.map((item, index) => {
          if (index !== 0) {
            item.shouldShow = false;
          }
          
          return item;
        });
  
        this.setState({list});
      }
    }
  }

  getList() {
    let {list} = this.state;

    return list.map((item) => {
      return item.shouldShow ? item.html : null;
    });
  }

  render() {
    const notificationListPosition = this.props.isDownPosition ? 'down' : 'up';

    return ReactDOM.createPortal(
      <div className={"notification-list " + notificationListPosition}>
        <div className="col">
          {this.getList()}
        </div>
      </div>,
      document.getElementById('notification')
    );
  }
}

export default NotificationList;
