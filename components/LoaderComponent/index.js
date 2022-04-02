import PropTypes from "prop-types";
import React from "react";
import Loader from "react-loader-spinner";

import { LoaderSection } from "../../styles/component/loaderComponent.style";

class LoaderComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: props.isLoading,
    };
  }
  componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (newProps != prevProps) {
      if (newProps.isLoading !== this.state.isLoading) {
        this.setState({ isLoading: newProps.isLoading });
      }
    }
  }
  render() {
    const { isLoading } = this.state;
    const { isSingleComponent } = this.props;
    return (
      isLoading && (
        <LoaderSection
          className={
            isSingleComponent
              ? "cos_fullView" + " position-absolute"
              : "cos_fullView"
          }
        >
          <Loader
            className={"cos_circleView"}
            type="Rings"
            color="#00BFFF"
            height={80}
            width={80}
            visible={isLoading}
          />
        </LoaderSection>
      )
    );
  }
}

LoaderComponent.propTypes = {
  isLoading: PropTypes.bool,
  isSingleComponent: PropTypes.bool,
};
export default LoaderComponent;
