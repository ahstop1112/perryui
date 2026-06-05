//  General JS Library importation
import React from "react";
import Loading from "components/Loading";

const sleep = (m) =>
  new Promise((r) => {
    setTimeout(r, m);
  });

const asyncComponent = (importComponent) => {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      await sleep(150);

      const { default: component } = await importComponent();

      this.setState({
        component,
      });
    }

    render() {
      const { component: C } = this.state;
      return C ? <C {...this.props} /> : <Loading size={25} />;
    }
  }

  return AsyncComponent;
};

export default asyncComponent;
