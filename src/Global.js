export class Global {
  static API_URL = 'https://webapi.emlakofisimden.com/api/';
}
export const app = {
  item: JSON.parse(localStorage.getItem('USER'))
};
