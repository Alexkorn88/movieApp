export default class SwapiService {
  _apiBase = "https://api.themoviedb.org/3";
  requestType = "/search/movie";
  keyAPI = "?api_key=e3c7bd01103073ebcb552edef41991b9";
  language = "&language=en-US";

  // async getResource(url) {
  //   const res = await fetch(
  //     `${this._apiBase}${this.requestType}${this.keyAPI}${this.language}${url}`
  //   );

  //   if (!res.ok) {
  //     throw new Error(`Ошибка сервера ${res.status}`);
  //   }
  // const body = await res.json();
  // return body;
  // }

  async getValueAsRequest(string, pagesCount = 1) {
    if (!string || /^\s+$/.test(string)) return;
    // try {
    const res = await fetch(
      `${this._apiBase}${this.requestType}${this.keyAPI}${
        this.language
      }&query=${string.trim()}&page=${pagesCount}&include_adult=false`
    );

    if (!res.ok) {
      throw new Error(`Ошибка сервера ${res.status}`);
    }
    const body = await res.json();
    return body;
    //return res;
    // } catch (error) {
    //   console.log(`ошибка ${error}`);
    // }
  }

  async getResponseGenreMovieDB() {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list${this.keyAPI}`
    );

    if (!res.ok) {
      throw new Error(
        `Could not fetch ${`https://api.themoviedb.org/3/genre/movie/list${this.keyAPI}`}`` , received${res.status}`
      );
    }

    const body = await res.json();

    return body;
  }
}

// const movies = new SwapiService();
// movies.getResponseGenreMovieDB().then((res) => console.log(res.genres));
// movies.getValueAsRequest("return").then((res) => console.log(res.results));
