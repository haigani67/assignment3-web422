import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";

function Restaurants() {
  let location = useLocation();
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const perPage = 10;

  useEffect(() => {
    setLoading(true);
    let queryStrObj = queryString.parse(location.search).borough;
    let urls = `https://afternoon-cove-77268.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;
    if (queryStrObj != undefined) {
      urls += "&borough=" + queryStrObj;
    }
    fetch(urls)
      .then((res) => res.json())
      .then((datas) => {
        setLoading(false);
        setRestaurants(datas);
        console.log(datas);
      });
  }, [page, location]);

  function previousPage() {
    if (page > 1) setPage((prev) => prev - 1);
  }

  function nextPage() {
    setPage((prev) => prev + 1);
  }

  if (!loading) {
    if (restaurants) {
      return (
        <div>
          <header>
            <h1>Res..</h1>
            <p>Full List of Resturants. Optionally sorted by borough</p>
          </header>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    history.push(`/Restaurant/${restaurant._id}`);
                  }}
                >
                  <td>{restaurant.name}</td>
                  <td>
                    {restaurant.address.building} {restaurant.address.street}
                  </td>
                  <td>{restaurant.borough}</td>
                  <td>{restaurant.cuisine}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        </div>
      );
    } else {
      return (
        <div>
          <header>
            <h1>About</h1>
            <p>Full List of Resturants. Optionally sorted by borough</p>
          </header>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              <tr colSpan="4">
                <td>No Resturants found</td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    }
  } else {
    return (
      <header>
        <p>loading Restaurant...</p>
      </header>
    );
  }
}
export default Restaurants;
