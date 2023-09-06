//使用 async/await 重写 "rethrow"
class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
  }

  async function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
        return response.json();
    } else {
        throw new HttpError(response);
    }
  }

  async function demoGithubUser() {
    let name = prompt("Enter a name?", "zhangzhiguo-fighting");
    let user;
    try {
        user = await loadJson(`https://github.com/${name}`);
    } catch (error) {
        if (error instanceof HttpError && error.response.status == 404) {
            alert("No such user, please reenter.");
          } else {
            alert('rethrowing');
            throw error;
          }
    }

    alert(`Full name: ${user.name}.`);
    return user;
  }

  demoGithubUser(); //trthrowing