function showRepositories() {
  let repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
        `<li>${r.name}` +
        ` - <a href="#" data-repo="${r.name}" onclick="getCommits(this)">` +
        `Get Commits</a></li>`
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const lis = commits
    .map(commit => {
      let login;
      if (commit.author) {
        login = commit.author.login;
      } else {
        login = "No author provided";
      }
      return `<li><strong>${login}</strong> - ` + `${commit.commit.message}</li>`;
    })
    .join("");
  const ul = `<ul>${lis}</ul>`;
  document.getElementById("commits").innerHTML = ul;
}

function getCommits(element) {
  const name = element.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", `https://api.github.com/repos/tuzmusic/${name}/commits`);
  req.send();
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/tuzmusic/repos?per_page=400");
  req.send();
}
