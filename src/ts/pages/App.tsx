import { withTheme } from '@mui/material';
import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import MainComponent from '../components/MainComponent';
import ICurrency from '../interfaces/currency';
import exchangeService from '../services/exchange.service';

interface IProps {
}
interface IState {
  exchange: Array<ICurrency>
}
class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
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
      <div className='App'>
        <div className='images-container'>
          <img className='background1-image' src="/images/background_1.jpg" alt='background1' />
          <img className='background2-image' src="/images/background_2.jpg" alt='background2' />
        </div>
        <HeaderComponent exchange={this.state.exchange} />
        <MainComponent exchange={this.state.exchange} />
      </div>
    );
  }
}

export default App;
