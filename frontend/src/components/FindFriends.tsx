import * as React from "react";
import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Add from "@material-ui/icons/Add";
import { Utils } from "../Utils";

interface IProps {}

interface IState {
  people: any;
}

//test git

export class FindFriends extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      people: [],
    };

    let data = {
      userId: Utils.getId(),
    };

    fetch(Utils.getUrl() + "users/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data)
    }).then((res) => {
      return res.json().then((body) => {
        this.setState({ people: body });
      });
    });
  }

  public render() {
    return (
      <Card style={{ padding: "40px", margin: "20px" }}>
        <List dense={true}>
          {this.state.people.map((person: any, i: number) =>
            person.id != Utils.getId() ? (
              <ListItem key={person.id}>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "white" }}>
                    <AccountCircle style={{ color: "#F46036" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={person.email} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => {
                      let data = {
                        type: 1,
                        userId: Utils.getId(),
                        friendId: person.id,
                      };

                      fetch(Utils.getUrl() + "friend/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                      }).then((res) => {
                        console.log("Successful", res);
                      });
                    }}
                  >
                    <Add />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ) : (
              <> </>
            )
          )}
        </List>
      </Card>
    );
  }
}
