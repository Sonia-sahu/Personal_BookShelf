// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookSearchPage from "./components/BookSearchPage";
import BookshelfPage from "./components/BookShelfPage";
const App=()=>{

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<BookSearchPage/>}></Route>
      <Route path="/bookshelf" element={<BookshelfPage/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
