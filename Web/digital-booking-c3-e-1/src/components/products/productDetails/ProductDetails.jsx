import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./ProductDetails.module.css";
import { ProductsContext } from "../../../context/ProductsContext";
import { AiOutlineTag } from "react-icons/ai";
import { BsGenderAmbiguous } from "react-icons/bs";
import { BsPalette } from "react-icons/bs";
import { TfiRulerAlt } from "react-icons/tfi";
import { FiInfo } from "react-icons/fi";
import { MdOutlineTexture } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import ImageGallery from "../../common/imagegalery/ImageGallery";
import Qualification from "../../resources/qualification/Qualification";
import RatingStats from "../../resources/rating/RatingStats";
import Politics from "../../resources/Politics/Politics";
import { MdLocationOn } from "react-icons/md";
import ProductMap from "../../resources/productMap/ProductMap";
//import CalendarProducts from "../../resources/Calendar/CalendarProducts";

const ProductDetails = () => {
  const data = useContext(ProductsContext);
  const [products, setProducts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [isUserLocationLoaded, setIsUserLocationLoaded] = useState(false);
  const [images, setImages] = useState([]);
  console.log(userLocation, isUserLocationLoaded);
  // const [product, setProduct] = useState()

  const product = products.find((p) => {
    return p.id === parseInt(params.id);
  });

  useEffect(() => {
    setProducts(data.products);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setIsUserLocationLoaded(true);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setIsUserLocationLoaded(true);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsUserLocationLoaded(true);
    }
    // searchProduct();
  }, [data]);

  console.log(product);

  const city = {
    name: "Buenos Aires",
    country: "Argentina",
    latitude: -34.6037,
    longitude: -58.3816,
    // latitude: 4.720391051238156,
    // longitude: -74.11880514789254,
  };

  return (
    <>
      {product && (
        <>
          <div className={styles.detailsHeaderContainer}>
            <div className={styles.detailsHeader}>
              <h2 className={styles.nameProduct}>{product.name}</h2>
              <div onClick={() => navigate(-1)}>
                <div className={styles.button}>
                  <FaArrowLeft /> <p> Volver </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.locationContainer}>
            <div className={styles.location}>
              <div className={styles.locationText}>
                <div className={styles.locationIcon}>
                  <div className={styles.circleIcon}>
                    <MdLocationOn size={24} />
                  </div>
                </div>
                {/*product.ciudad.nombre}, {product.ciudad.pais*/}

                <div>
                  <p className={styles.city}>
                    {" "}
                    Buenos Aires, Ciudad Autónoma de Buenos Aires, Argentina{" "}
                  </p>
                  <p className={styles.proximity}> A 940 m del centro</p>
                </div>
              </div>

              <div className={styles.ratingStats}>
                <RatingStats
                  color="var(--semantics-success)"
                  totalColor="var(--secondary-50)"
                  className={styles.ratingStatsItem}
                />
              </div>
            </div>
          </div>
          <div className={styles.detailsContainer}>
            <ImageGallery product={product} />
            <div className={styles.productDetails}>
              <div className={styles.description}>
                {/* <div className={styles.category}>{product.category}</div> */}
                <div className={styles.descriptionContainer}>
                  <h2 className={styles.descriptionTitle}>{product.name}</h2>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>

                  {/* <p className={styles.price}>${product.price}</p> */}
                </div>

                <div className={styles.review}>
                  <Qualification />
                </div>
              </div>

              <div className={styles.productFeature}>
                <h2 className={styles.titleFeature}>Características</h2>
                <div className={styles.feature}>
                  <div className={styles.textFeature}>
                    <AiOutlineTag size={24} />{" "}
                    <p className={styles.textFeatureDetails}>{product.brand}</p>
                  </div>
                  <div className={styles.textFeature}>
                    <MdOutlineTexture size={24} />{" "}
                    <p className={styles.textFeatureDetails}>
                      {product.material}
                    </p>
                  </div>
                  <div className={styles.textFeature}>
                    <TfiRulerAlt size={24} />{" "}
                    <p className={styles.textFeatureDetails}>{product.size}</p>
                  </div>
                  <div className={styles.textFeature}>
                    <BsPalette size={24} />{" "}
                    <p className={styles.textFeatureDetails}>{product.color}</p>
                  </div>
                  <div className={styles.textFeature}>
                    <BsGenderAmbiguous size={24} />{" "}
                    <p className={styles.textFeatureDetails}>
                      {" "}
                      {product.gender}
                    </p>
                  </div>
                  <div className={styles.textFeature}>
                    <FiInfo size={24} />
                    <p className={styles.textFeatureDetails}>
                      {" "}
                      {product.state}
                    </p>
                  </div>
                  <div className={styles.textFeature}>
                    <AiOutlineClockCircle size={24} />{" "}
                    <p className={styles.textFeatureDetails}>
                      {" "}
                      Alquiler por día
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.politics}>
                <Politics />
              </div>
            </div>
            {/* <div className={styles.map}>
              <ProductMap
                latitude={product.city.latitude}
                longitude={product.city.longitude}
                city={product.city}
              />
            </div> */}
          </div>
          <div className={styles.mapContainer}>
            <ProductMap
              latitude={city.latitude}
              longitude={city.longitude}
              city={city}
              product={product}
              userLocation={userLocation}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
