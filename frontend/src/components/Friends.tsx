import * as React from "react";
import {
  Card,
  InputLabel,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import { Utils } from "../Utils";

interface IProps {}

interface IState {
  friends: any;
}

export class Friends extends React.Component<IProps, IState> {
  private _category: string[] = [];

  constructor(props: IProps) {
    super(props);

    this.state = {
      friends: []
    };

    let data = {
      userId: Utils.getId()
    };

    fetch(Utils.getUrl() + "friend/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => {
      return res.json().then(body => {
        this.setState({ friends: body });
        console.log(body);
      });
    });
  }

  public render() {
    return (
      <Card style={{ margin: "20px" }}>
        <TableContainer component={Paper}>
          <Table style={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold"
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold"
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold"
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.friends.map((friend: any, i: number) => (
                <TableRow key={friend.id}>
                  <TableCell component="th" scope="row">
                    {friend.email}
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      required
                      defaultValue={friend.category}
                      onChange={e => {
                        this._category[i] = e.target.value;
                      }}
                    />
                    <IconButton
                      style={{ marginLeft: "5px" }}
                      edge="start"
                      onClick={() => {
                        let data = {
                          id: friend.id,
                          category: this._category[i]
                        };

                        fetch(Utils.getUrl() + "friend/category", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(data)
                        }).then(res => {
                          console.log("Successful", res);
                        });
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      edge="start"
                      onClick={() => {
                        let data = {
                          id: friend.id,
                          invited: !friend.invited
                        };

                        fetch(Utils.getUrl() + "friend/invite", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(data)
                        }).then(res => {
                          console.log("Successful", res);
                        });

                        let friends = this.state.friends;
                        friends[i].invited = !friends[i].invited;
                        this.setState({ friends });
                      }}
                    >
                      {friend.invited ? <ClearIcon /> : <SendIcon />}
                    </IconButton>

                    <IconButton
                      edge="end"
                      onClick={() => {
                        let data = {
                          id: friend.id,
                          type: -1
                        };

                        fetch(Utils.getUrl() + "friend/", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(data)
                        }).then(res => {
                          console.log("Delete", res);
                        });
                        let friends = this.state.friends;
                        friends.splice(i, 1);
                        this.setState(friends);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    );
  }
}
