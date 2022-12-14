export default class SwapiService {
  apiBase = 'https://api.themoviedb.org/3';

  requestType = '/search/movie';

  keyAPI = '?api_key=e3c7bd01103073ebcb552edef41991b9';

  language = '&language=en-US';

  async getValueAsRequest(string, pagesCount = 1) {
    if (!string || /^\s+$/.test(string)) return {};
    const res = await fetch(
      `${this.apiBase}${this.requestType}${this.keyAPI}${
        this.language
      }&query=${string.trim()}&page=${pagesCount}&include_adult=false`
    );

    if (!res.ok) {
      throw new Error(`Ошибка сервера ${res.status}`);
    }
    const body = await res.json();
    return body;
  }

  async getResponseGenreMovieDB() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list${this.keyAPI}`);

    if (!res.ok) {
      throw new Error(
        `Could not fetch ${`https://api.themoviedb.org/3/genre/movie/list${this.keyAPI}`}`` , received${res.status}`
      );
    }

    const body = await res.json();

    return body;
  }
}
