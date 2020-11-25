import * as React from "react";
import "./Header.css";
import { Utils } from "../Utils";
import { Button } from "@material-ui/core";

interface IProps {
  changeMode: any;
}

interface IState {
  clickedButton: number;
}

export class Header extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      clickedButton: 0
    };
  }

  public render() {
    return (
      <div
        id="header"
        style={{
          padding: 20,
          backgroundColor: "#4e3dbe"
        }}
      >
        {Utils.getId() != -1 ? (
          <div className="row" style={{ margin: 0 }}>
            <div className="col-2">
              <div
                className="button"
                style={{
                  width: " 150px",
                  backgroundColor: "#F46036",
                  color: this.state.clickedButton == 0 ? "#4e3dbe" : "white",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  textAlign: "center",
                  verticalAlign: " middle",
                  cursor: "pointer"
                }}
                onClick={() => {
                  this.setState({ clickedButton: 0 });
                  this.props.changeMode(1);
                }}
              >
                {" "}
                My Fridge{" "}
              </div>
            </div>

            <div className="col-2">
              <div
                className="button"
                style={{
                  width: " 150px",
                  backgroundColor: "#F46036",
                  color: this.state.clickedButton == 1 ? "#4e3dbe" : "white",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  textAlign: "center",
                  verticalAlign: " middle",
                  cursor: "pointer"
                }}
                onClick={() => {
                  this.setState({ clickedButton: 1 });
                  this.props.changeMode(4);
                }}
              >
                {" "}
                Friend's Fridge{" "}
              </div>
            </div>

            <div className="col-2">
              <div
                className="button"
                style={{
                  width: " 150px",
                  backgroundColor: "#F46036",
                  color: this.state.clickedButton == 2 ? "#4e3dbe" : "white",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  textAlign: "center",
                  verticalAlign: " middle",
                  cursor: "pointer"
                }}
                onClick={() => {
                  this.setState({ clickedButton: 2 });
                  this.props.changeMode(3);
                }}
              >
                {" "}
                My friends{" "}
              </div>
            </div>

            <div className="col-2">
              <div
                className="button"
                style={{
                  width: " 150px",
                  backgroundColor: "#F46036",
                  color: this.state.clickedButton == 3 ? "#4e3dbe" : "white",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  textAlign: "center",
                  verticalAlign: " middle",
                  cursor: "pointer"
                }}
                onClick={() => {
                  this.setState({ clickedButton: 3 });
                  this.props.changeMode(2);
                }}
              >
                {" "}
                Find friends{" "}
              </div>
            </div>

            <div
              className="col-2"
              style={{
                //backgroundColor: "red"
                color: "white",
                //float:"left",
                width: "150px",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                cursor: "pointer"
              }}
              onClick={() => {
                Utils.setId(-1);
                this.setState({ clickedButton: 0 });
                this.props.changeMode(0);
              }}
            >
              {" "}
              Sign Out
            </div>
          </div>
        ) : (
          <div
            style={{
              width: " 150px",
              backgroundColor: "#F46036",
              color: "white",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              borderRadius: "25px",
              textAlign: "center",
              verticalAlign: " middle"
            }}
          >
            {" "}
            Food Waste{" "}
          </div>
        )}
      </div>
    );
  }
}
