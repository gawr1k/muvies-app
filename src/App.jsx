import './App.scss';
import React from 'react';
import GenreId from './components/Card/genre_id';
import ApiClient from './components/ApiClient/ApiClient';
import Card from './components/Card/Card';
import MuvieMenu from './components/Menu/Menu';
import { Input } from 'antd';
import PaginationsPages from './components/PaginationsPages/PaginationsPages';

function App() {
  const [data, setData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [ratedMoviesIds, setRatedMoviesIds] = React.useState([]);
  const [menustate, setMenuState] = React.useState('/search');
  const { genresMap, getGenreNamesByIds } = GenreId();

  React.useEffect(() => {
    ApiClient(searchTerm, currentPage)
    .then(data => setData(data))
  }, [searchTerm, currentPage])

  React.useEffect(() => {
    console.log(ratedMoviesIds); 
  }, [ratedMoviesIds])

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
    setCurrentPage(1);
  };

  const onMenuClick = (id) => {
    setMenuState(id)
    console.log(menustate)
  }

  const renderContent = () => {
    if (menustate === '/search') {
      return (
        <>
        <main>
          {data.results && data.results.map((item)=>{
            return(
              <Card 
                key = {item.id}
                id = {item.id}
                original_title = {item.original_title}
                overview = {item.overview}
                release_date = {item.release_date}
                poster_path = {item.poster_path}
                genre_ids={item.genre_ids}
                genresMap={genresMap}
                vote_average = {item.vote_average}
                getGenreNamesByIds={getGenreNamesByIds}
                ratedMoviesIds = {ratedMoviesIds}
                setRatedMoviesIds={setRatedMoviesIds}
                item = {item}
              />
            )
          })}
        </main>
        <footer>
        {data.total_pages > 1 && (
          <PaginationsPages
            page={currentPage}
            handlePageChange={handlePageChange}
            total = {data.total_pages}
          />)}
      </footer>
        </>
      );
    } else if (menustate === '/rated') {
      const showPagination = ratedMoviesIds.length > 20;
      return (
        <main>
          {ratedMoviesIds.map((item)=>{
            return(
              <Card 
                key = {item.id}
                id = {item.id}
                original_title = {item.original_title}
                overview = {item.overview}
                release_date = {item.release_date}
                poster_path = {item.poster_path}
                genre_ids={item.genre_ids}
                genresMap={genresMap}
                vote_average = {item.vote_average}
                getGenreNamesByIds={getGenreNamesByIds}
                ratedMoviesIds = {ratedMoviesIds}
                setRatedMoviesIds={setRatedMoviesIds}
              />
            )
          })}
        </main>
      );
    }
  };


  return (
    <div className='container'>
      <div className='content'>
        <header>
            <div className='menu-center'>
              <MuvieMenu className="menu-center"
                onMenuClick = {onMenuClick}
              />
            </div>
            <Input 
              onChange={inputHandler}
              placeholder="Type to search..."
            />
        </header>
          {renderContent()}
        {/* <footer>
          {data.total_pages > 1 && (
            <PaginationsPages
              page={currentPage}
              handlePageChange={handlePageChange}
              total = {data.total_pages}
            />)}
        </footer> */}
      </div>
    </div>
    
  );
}

export default App;
