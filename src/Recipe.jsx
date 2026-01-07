import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const Recipe = () => {
  const [data, setData] = useState(null);
  const [search, setsearch] = useState('')

  const fetchApi = async (search) => {
const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

    try {
      const res = await axios(url);
    //   const response = await res.json();
      setData(res.data.meals);
      console.log(res.data.meals)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApi(search);
  }, [search]);


return (
  <>

    {/* HERO */}
    <section className="hero">
      <h1>Hungry? Let’s fix that 😋</h1>
      <p>Discover tasty meals & learn how to cook them</p>

      <input
        type="text"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        placeholder="Search pizza, burger, biryani..."
      />
    </section>

    {/* RESULTS */}
    <section className="box">
      {!data && <div className="loading">🍳 Preparing delicious results...</div>}

      {data &&
        data.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.strMealThumb} alt={item.strMeal} />

            <div className="card-body">
              <h3>{item.strMeal}</h3>

              <div className="tags">
                <span>{item.strCategory}</span>
                <span>{item.strArea}</span>
              </div>

              <a
                href={item.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                ▶ Watch Recipe
              </a>
            </div>
          </div>
        ))}
    </section>
  </>
);


};

export default Recipe;
