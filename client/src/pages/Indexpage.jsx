import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function Indexpage() {
  const [places, setplaces] = useState([]);
  const [paginatedItems, setpaginatedItems] = useState([]);
  const [itemsOffset, setitemsOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    // Fetch places data from API
    axios.get("/places").then((response) => {
      setplaces(response.data);
    });
  }, []);

  useEffect(() => {
    // Handle pagination logic when itemsOffset or places change
    const endOffset = itemsOffset + itemsPerPage;
    setpaginatedItems(places.slice(itemsOffset, endOffset));
  }, [places, itemsOffset, itemsPerPage]);

  function handleClick(event) {
    const newOffset = (event.selected * itemsPerPage) % places.length;
    setitemsOffset(newOffset);
  }

  return (
    <div >
        <div className="mt-8 gap-x-6 gap-y-8 grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {paginatedItems.length > 0 &&
        paginatedItems.map((place) => (
          <Link to={"/place/" + place._id} key={place.owner} className="">
            <div className="rounded-2xl mb-2">
              {place.photos?.[0] && (
                <img
                  className="object-cover rounded-2xl aspect-square"
                  src={import.meta.env.VITE_PHOTOS + place.photos[0]}
                  alt="image"
                ></img>
              )}
            </div>
            <div>
              <h2 className="font-bold ">{place.address}</h2>
              <h3 className="text-sm">{place.title}</h3>
              <div className="mt-2">
                <span className="font-bold"> ${place.price} per night</span>
              </div>
            </div>
          </Link>
        ))}
        </div>
      <div>
        <ReactPaginate
          previousLabel={"<previous"}
          nextLabel={"next>"}
          breakLabel={"..."}
          pageCount={Math.ceil(places.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handleClick}
          containerClassName={"pagination-container"}
          pageClassName={"pagination-page"}
          pageLinkClassName={"pagination-link"}
          activeClassName={"pagination-active"}
          previousClassName={"pagination-prev"}
          nextClassName={"pagination-next"}
          breakClassName={"pagination-break"}
        />
      </div>
    </div>
  );
}
