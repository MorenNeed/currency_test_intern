import React from "react";
import ICurrency from "../interfaces/currency";
import '../../scss/mainComponent.scss';
import { FormControl, Grid, MenuItem, Select, TextField } from "@mui/material";
import exchangeService from "../services/exchange.service";

interface IProps {
    exchange: Array<ICurrency>
}
interface IState {
    fromCurrency: string;
    toCurrency: string;
    amount: number;
    convertedAmount: number;
}

export default class MainComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            fromCurrency: "EUR",
            toCurrency: "USD",
            amount: 0,
            convertedAmount: 0,
        };

        this.handleFromCurrencyChange = this.handleFromCurrencyChange.bind(this);
        this.handleToCurrencyChange = this.handleToCurrencyChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.updateConvertedAmount = this.updateConvertedAmount.bind(this);
        this.handleConvertedAmountChange = this.handleConvertedAmountChange.bind(this);
        this.updateAmount = this.updateAmount.bind(this);
    }
    handleFromCurrencyChange(event: any) {
        const fromCurrency = event.target.value as string;
        this.setState({ fromCurrency }, () => {
            this.updateConvertedAmount(this.state.amount, this.state.fromCurrency, this.state.toCurrency);
        });
    }

    handleToCurrencyChange(event: any) {
        const toCurrency = event.target.value as string;
        this.setState({ toCurrency }, () => {
            this.updateConvertedAmount(this.state.amount, this.state.fromCurrency, this.state.toCurrency);
        });
    }

    handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
        const amount = parseFloat(event.target.value);
        this.setState({ amount }, () => {
            this.updateConvertedAmount(this.state.amount, this.state.fromCurrency, this.state.toCurrency);
        });
    }

    handleConvertedAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
        const convertedAmount = parseFloat(event.target.value);
        this.setState({ convertedAmount }, () => {
            this.updateAmount(this.state.convertedAmount, this.state.toCurrency, this.state.fromCurrency);
        });
    }

    updateAmount(ConvertedAmount: number, fromCurrency: string, toCurrency: string) {
        const convertedAmount = exchangeService.convertTo(ConvertedAmount, fromCurrency);
        const amount = exchangeService.convertFrom(convertedAmount, toCurrency);
        this.setState({ amount });
    }

    updateConvertedAmount(Amount: number, fromCurrency: string, toCurrency: string) {
        const amount = exchangeService.convertTo(Amount, fromCurrency);
        const convertedAmount = exchangeService.convertFrom(amount, toCurrency);
        this.setState({ convertedAmount });
    }

    render(): React.ReactNode {
        return (
            <main className="main">
                <Grid className="main-container" container direction={"row"} justifyContent={"space-evenly"} alignItems={"center"}>
                    <Grid item>
                        <FormControl>
                            <Grid container direction={"row"} spacing={3}>
                                <Grid item>
                                    {this.props.exchange.length > 0 && (
                                        <Select defaultValue="" value={this.state.fromCurrency || ''} onChange={this.handleFromCurrencyChange}>
                                            {this.props.exchange.map((currency) => (
                                                <MenuItem key={currency.cc} value={currency.cc}>
                                                    {currency.txt} ({currency.cc})
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Значення"
                                        type="number"
                                        value={Number.isNaN(this.state.amount) ? '' : this.state.amount}
                                        onChange={this.handleAmountChange}
                                    />
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <Grid container direction={"row"} spacing={3}>
                                <Grid item>
                                    {this.props.exchange.length > 0 && (
                                        <Select defaultValue="" value={this.state.toCurrency || ''} onChange={this.handleToCurrencyChange}>
                                            {this.props.exchange.map((currency) => (
                                                <MenuItem key={currency.cc} value={currency.cc}>
                                                    {currency.txt} ({currency.cc})
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}

                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Значення"
                                        type="number"
                                        value={Number.isNaN(this.state.convertedAmount) ? '' : this.state.convertedAmount}
                                        onChange={this.handleConvertedAmountChange}
                                    />
                                </Grid>
                            </Grid>

                        </FormControl>
                    </Grid>
                </Grid>
            </main>
        );
    }
}