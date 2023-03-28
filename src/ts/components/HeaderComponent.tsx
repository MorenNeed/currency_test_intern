import React from "react";
import ICurrency from "../interfaces/currency";
import '../../scss/headerComponent.scss';
import { Container, Row, Col } from "react-bootstrap";

interface IProps {
    exchange: Array<ICurrency>
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
                        <h6>
                            Валютні показники Національного банку до гривні на поточну дату:
                        </h6>
                    </div>
                    <Row className="exchange-container" xxl={2} xl={2} lg={2} md={2} sm={2} xs={2}>
                        {
                            this.props.exchange.filter(currency => currency.cc !== 'UAH')
                                .map(currency => (
                                    <Col key={currency.r030} className="currency-container">
                                        <h5
                                            className="currency-rate"
                                            style={{ transition: 'all 1s ease' }}
                                        >
                                            {currency.txt}: {currency.rate}
                                        </h5>
                                    </Col>
                                ))
                        }
                    </Row>
                </Container>
            </header>
        );
    }
}