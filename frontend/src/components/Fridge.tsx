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
  IconButton,
  Card
} from "@material-ui/core";
import { Utils } from "../Utils";
import SendIcon from "@material-ui/icons/Send";
import "../css/Fridge.css";
import ClearIcon from "@material-ui/icons/Clear";

//@ts-ignore
import Facebook from "react-sharingbuttons/dist/buttons/Facebook";
import "react-sharingbuttons/dist/main.css";

interface IProps {}

interface IState {
  products: any;
}

export class Fridge extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      products: []
    };

    let data = {
      userId: Utils.getId()
    };

    fetch(Utils.getUrl() + "products/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => {
      return res.json().then(body => {
        this.setState({ products: body });
        console.log(body);
      });
    });
  }

  public render() {
    return (
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-9">
          <Card>
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
                      Description
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
                      Expiration Date
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
                    <TableCell
                      align="right"
                      style={{
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "bold"
                      }}
                    >
                      Claimed by
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
                          edge="end"
                          onClick={() => {
                            let data = {
                              id: product.id,
                              isAvailable: !product.isAvailable
                            };

                            fetch(Utils.getUrl() + "products/available", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(data)
                            }).then(res => {
                              console.log("Successful", res);
                            });

                            let products = this.state.products;
                            products[i].isAvailable = !products[i].isAvailable;
                            this.setState({ products });
                          }}
                        >
                          {product.isAvailable ? <ClearIcon /> : <SendIcon />}
                        </IconButton>
                        <Facebook
                          url={
                            "https://versusapp.eu/app/foodWaste.php?text=" +
                            product.name
                          }
                        />
                      </TableCell>
                      <TableCell align="right">{product.claimedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </div>

        <div className="col-3">
          <Card>
            <AddProduct addProduct={this._addProduct} />
          </Card>
        </div>
      </div>
    );
  }

  private _addProduct = (product: any) => {
    let products = this.state.products;
    products.push(product);
    this.setState({ products });
  };
}
