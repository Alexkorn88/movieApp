export default class SwapiService {
  _apiBase = "https://api.themoviedb.org/3";
  requestType = "/search/movie";
  keyAPI = "?api_key=e3c7bd01103073ebcb552edef41991b9";
  language = "&language=en-US";
  // query = "&query=return";
  // pageSearch = "&page=1";
  // includeAdult = "&include_adult=false";

  async getResource(url) {
    const res = await fetch(
      `${this._apiBase}${this.requestType}${this.keyAPI}${this.language}${url}`
    );

    if (!res.ok) {
      throw new Error(`Ошибка сервера ${res.status}`);
    }
    const body = await res.json();
    return body;
  }

  async getValueAsRequest(string) {
    if (!string || string === " ") return;
    try {
      const res = await this.getResource(
        `&query=${string.trim()}&page=1&include_adult=false`
      );
      return res;
    } catch (error) {
      console.log(`ошибка ${error}`);
    }
  }
}

// const movies = new SwapiService();
// movies.getValueAsRequest("return").then((res) => console.log(res.results));
