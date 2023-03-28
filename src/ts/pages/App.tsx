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
        <HeaderComponent exchange={this.state.exchange} />
        <MainComponent exchange={this.state.exchange} />
      </div> 
    );
  }
}

export default App;
