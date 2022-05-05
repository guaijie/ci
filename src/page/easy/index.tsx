import { Component } from 'react';

export default class Easy extends Component<unknown, { count: number }> {
  state = {
    count: 0,
  };
  handleClick = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  };
  render() {
    const { count } = this.state;
    return <div onClick={this.handleClick}>easy :{count}</div>;
  }
}
