import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { Map, TileLayer, Marker } from "react-leaflet";
function Restaurant() {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let urls = `https://afternoon-cove-77268.herokuapp.com/api/restaurants/${id}`;

    fetch(urls)
      .then((res) => res.json())
      .then((resonse_restaurant) => {
        setLoading(false);
        if (resonse_restaurant.hasOwnProperty("_id")) setRestaurant(restaurant);
        else setRestaurant(null);
      });
  }, [id]);

  if (!loading) {
    if (restaurant) {
      return (
        <div>
          <h1>{restaurant.name}</h1>
          <p>
            {restaurant.address.building} {restaurant.address.street}
          </p>

          <Map
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </Map>

          <CardDeck>
            {restaurant.grades.map((element, i) => (
              <Card key={i} style={{ flex: "auto" }}>
                <Card.Header className="bg-light">
                  <Card.Title>Grade: {element.grade}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>Date: {element.date.toString()}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </CardDeck>
        </div>
      );
    } else {
      return <h1>Unable to find resturant with id: {id}</h1>;
    }
  } else {
    return <h1>Loading Resturant Data...</h1>;
  }
}

export default Restaurant;
