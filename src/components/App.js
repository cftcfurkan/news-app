import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';

function App() {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [url, setUrl] = useState("http://hn.algolia.com/api/v1/search?query=");

  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(!loading);
    axios
      .get(`${url}${searchQuery}`)
      .then((data) => setNews(data.data.hits), setLoading(loading))
      .catch((error) => {
        console.error("error", error);
      });
  };

  useEffect(() => {
    fetchNews();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`${url}${searchQuery}`);
  };

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </form>
  );
  const showNews = () => {
    return news.map((row) => (
        <TableRow
        key={row.story_id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>{row.objectID}</TableCell>
        <TableCell component="th" scope="row">
          <Link href={row.url}><LaunchIcon/></Link>
        </TableCell>
        <TableCell>{row.author}</TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>{row.updated_at}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="App">
      <h1>News</h1>
      {searchForm()}
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>News ID</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{showNews()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
