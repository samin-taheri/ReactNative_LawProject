/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import axios from 'axios';
import {Global} from "../Global";

const URL = `${Global.API_URL}Licences/`;

export default class LicencesService {
    // eslint-disable-next-line class-methods-use-this
    GetAllByUserId(UserId) {
        return axios.get(`${URL}GetAllByUserId?userId=${UserId}`, {
            UserId
        })
    }
}
