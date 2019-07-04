// your code here

//#2
function showRepositories(){
  var repos = JSON.parse(this.responseText);
  //we set it up so that this will be our req object inside our callback function.
  //MUST TELL JS ITS WORKING WITH JSON!!
  //parsing the text into an array of objects that we can work with.
  console.log(repos);

//#3
  const repoList = `<ul>${repos
    .map(repo => '<li>' + repo.name + ' - <a href="#" data-repo="' + repo.name + '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
    //The second thing is our onclick is explicitly passing this to the getCommits function.
  document.getElementById('repositories').innerHTML = repoList;

}

//#1
function getRepositories(){
  const requesT = new XMLHttpRequest();
  requesT.addEventListener('load', showRepositories)
  requesT.open('GET', 'https://api.github.com/users/octocat/repos');
  requesT.send();
}

//#4
function getCommits(el){
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}
//Here we grab that data-repo value through the dataset property, then set up an XHR request, with an event listener and callback function, just like we did in getRepositories.

function showCommits() {
  const commits = JSON.parse(this.responseText);
  
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('commits').innerHTML = commitsList;

}
