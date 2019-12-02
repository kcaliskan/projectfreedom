import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/user";
import CodewarsChart from "./CodewarsChart";
import PropTypes from "prop-types";
import axios from "axios";

// const CodewarsResult = ({ profile, auth, getCurrentProfile }) => {
//   const [loadingLocalState, setLoadingLocalState] = useState(true);

//   const [codewarsProfile, setProfile] = useState({
//     codewarsProfile: profile
//   });

//   let loading = loadingLocalState;

//   useEffect(() => {
//     checkStatus();
//   }, []);

//   const noProfile = <Fragment>There is no profile create it amk</Fragment>;

//   const checkStatus = async () => {
//     const res = await axios.get("/api/user/isAnalysisReady");
//     const isReady = res.data;
//     console.log(isReady, "im api res");

//     if (isReady) {
//       setLoadingLocalState(false);
//     } else {
//       setTimeout(() => {
//         checkStatus();
//         getCurrentProfile();
//       }, 3500);
//     }
//   };

//   const handleDisplay = loading => {
//     if (loading === false) {
//       return <CodewarsChart />;
//     } else {
//       return (
//         <Fragment>
//           <div>loading</div>
//         </Fragment>
//       );
//     }
//   };

//   return <Fragment>{profile ? handleDisplay(loading) : noProfile}</Fragment>;
// };

///// V2 //////
class CodewarsResult extends React.Component {
  state = { loadingLocalState: true, codewarsProfile: {} };

  noProfile = (<Fragment>There is no profile create it amk</Fragment>);

  checkStatus = async () => {
    const res = await axios.get("/api/user/isAnalysisReady");
    const isReady = res.data;
    console.log(isReady, "im api res");

    if (isReady) {
      this.props.getCurrentProfile();
      this.setState({
        loadingLocalState: false,
        codewarsProfile: this.props.profile
      });

      // this.handleDisplay(this.state.loadingLocalState)
    } else {
      setTimeout(() => {
        this.checkStatus();
        this.props.getCurrentProfile();
      }, 3500);
    }
  };

  handleDisplay = loading => {
    if (loading === false) {
      console.log(this.state);
      return <CodewarsChart codewarsProfile={this.state.codewarsProfile} />;
    } else {
      this.checkStatus();
      return (
        <Fragment>
          <div>loading</div>
        </Fragment>
      );
    }
  };

  // componentDidMount() {
  //   this.checkStatus();
  // }

  render() {
    return (
      <Fragment>
        {this.props.profile
          ? this.handleDisplay(this.state.loadingLocalState)
          : this.noProfile}
      </Fragment>
    );
  }
}
///// V2 //////

const mapStateToProps = props => ({
  auth: props.auth,
  profile: props.profile.codewars
});

export default connect(mapStateToProps, { getCurrentProfile })(CodewarsResult);
