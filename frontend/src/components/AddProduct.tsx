import * as React from "react";
import "date-fns";
import { Card, InputLabel, TextField, Button } from "@material-ui/core";
import { Utils } from "../Utils";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

interface IProps {
  addProduct: any;
}

interface IState {
  expirationDate: Date;
}

export class AddProduct extends React.Component<IProps, IState> {
  private _name: string = "";
  private _description: string = "";
  private _category: string = "";

  constructor(props: IProps) {
    super(props);

    this.state = {
      expirationDate: new Date()
    };
  }

  public render() {
    return (
      <Card style={{ padding: "40px" }}>
        <InputLabel
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold"
          }}
        >
          Add Product
        </InputLabel>
        <TextField
          required
          label="Name"
          onChange={e => {
            this._name = e.target.value;
          }}
        />
        <TextField
          required
          label="Description"
          multiline
          rows="4"
          onChange={e => {
            this._description = e.target.value;
          }}
        />
        <TextField
          required
          label="Category"
          onChange={e => {
            this._category = e.target.value;
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="Expiration Date"
            value={this.state.expirationDate}
            onChange={(date: Date | null) => {
              if (date != null) {
                this.setState({ expirationDate: date });
              }
            }}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>

        <div>
          <Button
            variant="contained"
            style={{ marginTop: "30px" }}
            onClick={() => {
              let data = {
                name: this._name,
                description: this._description,
                category: this._category,
                valability: this.state.expirationDate,
                userId: Utils.getId()
              };

              console.log(JSON.stringify(data));

              fetch(Utils.getUrl() + "products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
              }).then(res => {
                return res.json().then(body => {
                  if (body.id == -1) {
                    alert("Error");
                  } else {
                    this.props.addProduct(body);
                  }
                });
              });
            }}
          >
            Add Product
          </Button>
        </div>
      </Card>
    );
  }
}
