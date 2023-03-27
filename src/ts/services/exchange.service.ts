import axios from "axios";
import ICurrency from "../interfaces/currency";

class exchangeService {
    private readonly API_URL: string;
    private data : Array<ICurrency>;
    constructor() {
        this.API_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
        this.data = [];
    }
    private filterBySelectedCurrencies(selectedCurrencies: string[]) : Array<ICurrency>
    {
        return this.data.filter(obj => selectedCurrencies.includes(obj.cc))
    }
    async getCurrentExchange() : Promise<Array<ICurrency>> {
        const response = await axios.get(this.API_URL);
        
        this.data = response.data;

        this.data = this.filterBySelectedCurrencies(['USD', 'EUR']);

        return this.data;
    }
}

export default new exchangeService();