/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import axios from 'axios';
import {Global} from "../Global";

const URL = `${Global.API_URL}Cities/`;

export default class CityService {
  // eslint-disable-next-line class-methods-use-this
  getAll(countryId) {
    return axios.get(`${URL}GetAll?countryId=${countryId}`);
  }
}
