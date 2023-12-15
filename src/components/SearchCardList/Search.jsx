// import { Card } from "antd";
// import React from "react";

// const SearchCardList = () => {
//   return (
//     <>
//       <div className="input-container">
//         <Input onChange={inputHandler} placeholder="Type to search..." />
//       </div>
//       {loading ? (
//         <div className="example">
//           <Spin tip="Loading" size="large">
//             <div className="content" />
//           </Spin>
//         </div>
//       ) : (
//         <main>
//           {data.results && data.results.length > 0 ? (
//             data.results.map((item) => (
//               <Card
//                 key={item.id}
//                 id={item.id}
//                 original_title={item.original_title}
//                 overview={item.overview}
//                 release_date={item.release_date}
//                 poster_path={item.poster_path}
//                 genre_ids={item.genre_ids}
//                 vote_average={item.vote_average}
//                 getGenreNamesByIds={getGenreNamesByIds}
//                 ratedMoviesIds={ratedMoviesIds}
//                 setRatedMoviesIds={setRatedMoviesIds}
//                 item={item}
//               />
//             ))
//           ) : (
//             <NoData />
//           )}
//         </main>
//       )}
//       <footer>
//         {data.total_pages > 1 && (
//           <PaginationsPages
//             page={currentPage}
//             handlePageChange={handlePageChange}
//             total={data.total_pages}
//           />
//         )}
//       </footer>
//     </>
//   );
// };
