import axios from "axios";
import ICurrency from "../interfaces/currency";

class exchangeService {
    private readonly API_URL: string;
    private data: Array<ICurrency>;

    constructor() {
        this.API_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
        this.data = [];
    }
    private filterBySelectedCurrencies(selectedCurrencies: string[]): Array<ICurrency> {
        const filteredData = this.data.filter(obj => selectedCurrencies.includes(obj.cc));

        filteredData.push({'cc': 'UAH', 'exchangedate': this.data[0].exchangedate, 'r030': 0o0, 'rate': 1, txt: 'Гривня'});
        return filteredData;
    }
    public async getCurrentExchange(): Promise<Array<ICurrency>> {
        const response = await axios.get(this.API_URL);

        this.data = response.data;

        this.data = this.filterBySelectedCurrencies(['USD', 'EUR']);

        return this.data;
    }
    public async convertCurrencies(from: ICurrency | undefined, to: ICurrency | undefined): Promise<Array<number>> {

        if (from && to) {
            const array = await [from.rate / to.rate, to.rate / from.rate];

            return array;
        }
        return [];
    }
    convertTo(amount: number, fromCurrency: string): number {
        const currency = this.data.filter(currency =>
            currency.cc === fromCurrency
        );

        const exchangeRate = currency[0].rate;

        return +(amount * exchangeRate).toFixed(4);
    }

    convertFrom(amount: number, toCurrency: string): number {
        const currency = this.data.filter(currency =>
            currency.cc === toCurrency
        );
 
        const exchangeRate = currency[0].rate;

        return +(amount / exchangeRate).toFixed(4);
    }
}

export default new exchangeService();