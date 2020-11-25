import * as React from "react";
import { Authentication } from "./Authentication";
import { Header } from "./Header";
import { Fridge } from "./Fridge";
import { Friends } from "./Friends";
import "bootstrap/dist/css/bootstrap.min.css";
import { FindFriends } from "./FindFriends";
import { FriendsFridge } from "./FriendsFridge";

interface IProps {}

interface IState {
  mode: number;
}

export class Main extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      mode: 0
    };
  }

  public render() {
    return (
      <div>
        <Header changeMode={this._changeMode} />
        <div
          style={{
            padding: "20px"
          }}
        >
          {this._showContent()}
        </div>
      </div>
    );
  }

  private _showContent = () => {
    switch (this.state.mode) {
      case 0: {
        return <Authentication changeMode={this._changeMode} />;
      }
      case 1: {
        return <Fridge />;
      }
      case 2: {
        return <FindFriends />;
      }
      case 3: {
        return <Friends />;
      }
      case 4: {
        return <FriendsFridge />;
      }
    }
  };

  private _changeMode = (mode: number) => {
    this.setState({ mode });
  };
}
