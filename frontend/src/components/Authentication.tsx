import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Utils } from "../Utils";

interface IProps {
  changeMode: any;
}

interface IState {}

export class Authentication extends React.Component<IProps, IState> {
  private _loginEmail: string = "";
  private _loginPassword: string = "";

  private _signEmail: string = "";
  private _signPassword: string = "";
  private _signConfirmPassword: string = "";

  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-3" />
        <div className="col-3">
          <Card style={{ padding: "40px" }}>
            <InputLabel
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold"
              }}
            >
              Login
            </InputLabel>
            <TextField
              required
              label="Email"
              onChange={e => {
                this._loginEmail = e.target.value;
              }}
            />
            <TextField
              required
              label="Password"
              type="password"
              onChange={e => {
                this._loginPassword = e.target.value;
              }}
            />

            <div>
              <Button
                variant="contained"
                style={{ marginTop: "30px" }}
                onClick={() => {
                  let data = {
                    email: this._loginEmail,
                    password: this._loginPassword
                  };

                  fetch(Utils.getUrl() + "users/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                  }).then(res => {
                    return res.json().then(body => {
                      if (body == -1) {
                        alert("Wrong username or password");
                      } else {
                        Utils.setId(body);
                        this.props.changeMode(1);
                      }
                    });
                  });
                }}
              >
                Login
              </Button>
            </div>
          </Card>
        </div>
        <div className="col-3">
          <Card style={{ padding: "40px" }}>
            <InputLabel
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold"
              }}
            >
              Sign Up
            </InputLabel>
            <TextField
              required
              label="Email"
              onChange={e => {
                this._signEmail = e.target.value;
              }}
            />
            <TextField
              required
              label="Password"
              type="password"
              onChange={e => {
                this._signPassword = e.target.value;
              }}
            />
            <TextField
              required
              label="Confirm Password"
              type="password"
              onChange={e => {
                this._signConfirmPassword = e.target.value;
              }}
            />

            <div>
              <Button
                variant="contained"
                style={{ marginTop: "30px" }}
                onClick={() => {
                  if (this._signConfirmPassword.trim().length == 0) {
                    alert("Confirm password");
                    return;
                  }

                  if (
                    !(
                      this._signConfirmPassword.trim() ===
                      this._signPassword.trim()
                    )
                  ) {
                    alert("Password mismatch");
                    return;
                  }
                  let data = {
                    email: this._signEmail,
                    password: this._signPassword
                  };

                  console.log(JSON.stringify(data));

                  fetch(Utils.getUrl() + "users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                  }).then(res => {
                    console.log("Request complete! response:", res);
                  });
                }}
              >
                Sign Up
              </Button>
            </div>
          </Card>
        </div>
        <div className="col-3" />
      </div>
    );
  }
}
