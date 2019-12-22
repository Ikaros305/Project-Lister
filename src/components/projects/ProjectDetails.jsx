import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
import { intern } from "../../store/actions/applyActions";

import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Grid1 from "components/Grid/Grid1.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx";

import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  // CloudDownload,
  // PersonAdd,
  // OpenInBrowser,
  // BarChart,
  // PieChart,
  // NoteAdd,
  // ExitToApp,
  ArrowBackIosRounded
} from "@material-ui/icons";
class ProjectDetails extends Component {
  handleBack = e => {
    e.preventDefault();

    this.props.history.push("/");
  };
  render() {
    const { classes } = this.props;

    const { project, auth } = this.props;
    // const {  id, profile } = this.props;

    // const links =
    //   profile.category === "company" ? (
    //     <div />
    //   ) : (
    //     <div>
    //       <Link to={"/apply/" + id}>
    //         <GridContainer justify="center">
    //           <GridItem xs={12} sm={12} md={1} className={classes.textCenter}>
    //             <Button color="primary">Apply</Button>
    //           </GridItem>
    //         </GridContainer>
    //       </Link>
    //     </div>
    //   );

    if (!auth.uid) return <Redirect to="/signin" />;
    if (project) {
      return (
        <div>
          <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
              {" "}
              <Grid1>
                <GridItem xs={3} sm={3} md={1}>
                  <Button color="transparent" block onClick={this.handleBack}>
                    <ArrowBackIosRounded className={classes.icon} />
                    BACK
                  </Button>
                </GridItem>
              </Grid1>
              <div className={classes.container}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.profile}>
                      <div>
                        {/* <img
                        src="assets/img/faces/christian.jpg"
                        alt="..."
                        className={imageClasses}
                      /> */}
                      </div>
                      {/* <div className={classes.name}>
                    <GridItem xs={12} sm={12} md={3}>
                        <SnackbarContent
                          message={
                            <h2 className={classes.title}>
                              {project.companyname}
                            </h2>
                          }
                        />
                      </GridItem> </div>*/}
                      <div>
                        <h2 className={classes.title}>
                          {project.project_title}
                        </h2>
                      </div>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <SnackbarContent
                      message={
                        "Team Member 1 Name: " + project.team_member_1_name
                      }
                    />
                  </GridItem>
                  {project.team_member_2_name ? (
                    <GridItem xs={12} sm={12} md={6}>
                      <SnackbarContent
                        message={
                          "Team Member 2 Name: " + project.team_member_2_name
                        }
                      />
                    </GridItem>
                  ) : (
                    ""
                  )}

                  {project.team_member_3_name ? (
                    <GridItem xs={12} sm={12} md={6}>
                      <SnackbarContent
                        message={
                          "Team Member 3 Name: " + project.team_member_3_name
                        }
                      />
                    </GridItem>
                  ) : (
                    ""
                  )}

                  <GridItem xs={12} sm={12} md={6}>
                    <SnackbarContent
                      message={"Guide Name: " + project.guide_name}
                    />
                  </GridItem>
                  {project.co_guide_name ? (
                    <GridItem xs={12} sm={12} md={6}>
                      <SnackbarContent
                        message={"Co-Guide Name: " + project.co_guide_name}
                      />{" "}
                    </GridItem>
                  ) : (
                    ""
                  )}
                  <GridItem xs={12} sm={12} md={6}>
                    <SnackbarContent
                      message={"Department: " + project.department}
                    />
                  </GridItem>
                  {project.domain ? (
                    <GridItem xs={12} sm={12} md={6}>
                      <SnackbarContent message={"Domain: " + project.domain} />
                    </GridItem>
                  ) : (
                    ""
                  )}
                  {project.abstract ? (
                    <GridItem xs={12} sm={12} md={6}>
                      <SnackbarContent
                        message={"Abstract: " + project.abstract}
                      />
                    </GridItem>
                  ) : (
                    ""
                  )}
                  {/*   <GridItem xs={12} sm={12} md={6}>
                  <SnackbarContent
                    message={"Apply By: " + project.postedon}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <SnackbarContent
                    message={
                      "Internship Available: " + project.internshipsavailable
                    }
                  />
                </GridItem> */}
                </GridContainer>
                {/* <SnackbarContent
                message={"About Internship: " + project.aboutinternship}
              />
              <SnackbarContent
                message={"Skill Required: " + project.skillrequired}
              />
              <SnackbarContent
                message={"Who can Apply: " + project.whocanapply}
              />
              <SnackbarContent message={"Perk: " + project.perk} />*/}
              </div>
              {/* <div> {links} </div> */}
            </div>
          </div>
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <CircularProgress className={classes.progress} color="secondary" />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    project: project,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    id: id
  };
};
const mapDispatchToProps = dispatch => {
  return {
    intern: apply => dispatch(intern(apply))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(profilePageStyle),
  withStyles(workStyle),
  firestoreConnect([
    {
      collection: "projects"
    }
  ]),
  withStyles(typographyStyle)
)(ProjectDetails);
