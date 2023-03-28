import React from "react";
import ICurrency from "../interfaces/currency";
import '../../scss/headerComponent.scss';
import { Container, Row, Col } from "react-bootstrap";


interface IState {
    exchange: Array<ICurrency>
}
interface IProps {
    exchange: Array<ICurrency>
}

interface ISpringProps {
    value: number;
}

export default class HeaderComponent extends React.Component<IProps> {
    render(): React.ReactNode {
        return (
            <header className="header">
                <Container>
                    <div className="header-heading">
                        <h1>
                            Конвертер валют
                        </h1>
                        <p>
                            Валютні показники Нацбанку до гривні на поточну дату:
                        </p>
                    </div>
                    <Row className="exchange-container">
                        {
                            this.props.exchange.filter(currency => currency.cc !== 'UAH')
                                .map(currency => (
                                    <Col key={currency.r030} className="currency-container">
                                        <div
                                            className="currency-rate"
                                            style={{ transition: 'all 1s ease' }}
                                        >
                                            {currency.txt}: {currency.rate}
                                        </div>
                                    </Col>
                                ))
                        }
                    </Row>
                </Container>
            </header>
        );
    }
}