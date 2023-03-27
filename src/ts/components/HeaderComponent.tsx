import React from "react";
import ICurrency from "../interfaces/currency";
import exchangeService from "../services/exchange.service";
import '../../scss/headerComponent.scss';
import { Container, Row, Col } from "react-bootstrap";

interface IProps {
}

interface IState {
    exchange: Array<ICurrency>
}

export default class HeaderComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state =
        {
            exchange: []
        }
    }
    componentDidMount(): void {
        exchangeService.getCurrentExchange()
            .then(data => {
                this.setState({ exchange: data });
            })
    }
    render(): React.ReactNode {
        return (
            <header className="header">
                <Container>
                    <div className="header-heading">
                        <h1>
                            Currency Converter
                        </h1>
                    </div>
                    <Row className="exchange-container">
                        {
                            this.state.exchange.map(currency => (
                                <Col key={currency.r030} className="currency-container">
                                    {currency.txt}: {currency.rate}
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </header>
        );
    }
}