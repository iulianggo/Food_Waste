import * as React from "react";
import { AddProduct } from "./AddProduct";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  TextField,
  InputLabel,
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import { Utils } from "../Utils";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ClearIcon from "@material-ui/icons/Clear";

interface IProps {}

interface IState {
  products: any;
  people: any;
}

//test git

export class FriendsFridge extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      products: [],
      people: [],
    };

    let data = {
      friendId: Utils.getId(),
    };

    fetch(Utils.getUrl() + "friend/user/invited", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json().then((body) => {
        this.setState({ people: body });
      });
    });
  }

  public render() {
    return (
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-9">
          <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Expiration Date
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Claim
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.products.map((product: any, i: number) => (
                  <TableRow key={product.id}>
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">{product.description}</TableCell>
                    <TableCell align="right">{product.category}</TableCell>
                    <TableCell align="right">
                      {new Intl.DateTimeFormat("en-AU").format(
                        new Date(product.valability)
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          if (product.claimedById == null) {
                            let data = {
                              id: product.id,
                              claimedById: Utils.getId(),
                            };

                            fetch(Utils.getUrl() + "products/claim", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(data),
                            }).then((res) => {
                              console.log("Successful", res);
                            });

                            let products = this.state.products;
                            products[i].claimedById = Utils.getId();
                            this.setState({ products });
                          }
                        }}
                      >
                        {product.claimedById != null ? (
                          <div
                            style={{
                              fontSize: 15,
                              fontFamily: "Arial, sans-serif",
                            }}
                          >
                            {" "}
                            Already Claimed{" "}
                          </div>
                        ) : (
                          <Add />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="col-3">
          <Card style={{ padding: "40px" }}>
            <InputLabel
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
              }}
            >
              Friends
            </InputLabel>
            <List dense={true}>
              {this.state.people.map((person: any, i: number) => (
                <ListItem
                  key={person.friendId}
                  button
                  onClick={() => {
                    let data = {
                      userId: person.friendId,
                    };

                    fetch(Utils.getUrl() + "products/user/available", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                    }).then((res) => {
                      return res.json().then((body) => {
                        this.setState({ products: body });
                      });
                    });
                  }}
                >
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "white" }}>
                      <AccountCircle style={{ color: "#F46036" }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={person.email} />
                </ListItem>
              ))}
            </List>
          </Card>
        </div>
      </div>
    );
  }
}
