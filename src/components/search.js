import { useState } from "react";
import "./style.css";

//Fetch Github API
const API_URL = "https://api.github.com"; 

async function fetchResults(query) {
  try {
    const response = await fetch(`${API_URL}/search/users?q=${query}`);
    const json = await response.json();
    return json.items || [];
  } catch (e) {
    throw new Error(e);
  }
}

export default function Profile() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function onSearchChange(event) {
    setQuery(event.target.value);
  }

  async function onSearchSubmit(event) {
    event.preventDefault();
    const results = await fetchResults(query);
    setResults(results);
  }

  return (
    <div className="app">
      <main className="main">
        <h2>GitHub User Search</h2>
        <Form
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          value={query}
        />
        <h3>Profile/s</h3>
        <hr></hr>
        <div id="results">
          <div className="p-3 p-lg-2 d-flex flex-column">
            <div className="d-flex flex-column flex-md-row mb-5 flex-wrap">
            {results.map((user) => (
              <User
                key={user.login}
                avatar={user.avatar_url}
                url={user.html_url}
                username={user.login}
              />
            ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function User({ avatar, url, username }) {
  return (
    <div className="">
      {/* <img src={avatar} alt="Profile" width="50" height="50" />
      <a href={url} target="_blank" rel="noopener noreferrer">
        {username}
      </a> */}
      <div class="container">
  <div class="row">
    <div class="col">
    <div className="d-flex flex-column align-items-center mx-auto mb-2">
      <img src={avatar} className="img-fluid img-profile rounded-circle mx-auto mb-2" alt="..."></img>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {username}
      </a>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}



function Form({ onSubmit, onChange, value }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        id="search"
        type="text"
        placeholder="Enter username or email"
        onChange={onChange}
        value={value}
      />
      <button type="submit" disabled={!value} className="btn btn-primary">Search</button>
    </form>
  );
}
