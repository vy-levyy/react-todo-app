import React from 'react';
import TodoNotificationListItem from '../TodoNotificationListItem/TodoNotificationListItem.jsx';
import './style.css';

class TodoNotificationList extends React.Component {
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
    this.addItem(newProps.children);
    this.processList();
    return true;
  }

  componentWillUnmount() {
    clearTimeout(TodoNotificationList.timerIds);
  }


  addItem(item) {
    let {list} = this.state;

    list.unshift({
      html: (
        <TodoNotificationListItem
          className="row"
          key={TodoNotificationList.lastId}
        >
          {item}
        </TodoNotificationListItem>
      ),
      shouldShow: true
    });

    TodoNotificationList.lastId += 1;

    this.setState({list});
    this.removeItem();
  }

  removeItem() {
    const timerId = setTimeout(() => {
      let {list} = this.state;

      list.pop();

      this.setState({list});
    }, 3000);

    TodoNotificationList.timerIds.push(timerId);
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

    list = list.filter((item) => {
      return item.shouldShow;
    });

    return list.map((item) => {
      return item.html;
    });
  }


  render() {
    return (
      <div className={this.props.className + " todo-notification-list"}>
        <div className="col">
          {this.getList()}
        </div>
      </div>
    );
  }
}

export default TodoNotificationList;
