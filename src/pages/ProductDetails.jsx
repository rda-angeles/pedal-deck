import { useParams } from "react-router-dom";
import { products } from "../assets/data";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import SectionImage from "../components/UI/SectionImage";
import CurrencyFormatter from "../helpers/currencyFormatter";
import BikeDetailImg from "../assets/images/about.jpg";
const ProductDetails = () => {
  const navigateBack = useNavigate();
  const { id } = useParams();
  const product = products.find((item) => item.id == id);
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: product.id,
        prodName: product.prodName,
        price: product.price,
        img: product.img,
      })
    );

    toast.success("Product added successfully!");
  };
  return (
    <div>
      <SectionImage title={product.prodName} bg={BikeDetailImg} />
      <div className="px-4 py-12 prod-details">
        <div className="container mx-auto ">
          {/* Back Button */}
          <div className="mb-3">
            <button
              onClick={() => navigateBack(-1)}
              className="flex items-center"
            >
              <ArrowBackIosNewIcon />
              <p className="text-sm">Back</p>
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-10">
            {/* Image */}

            <div className="image-wrapper max-w-3xl mb-5">
              <img
                src={product.img}
                alt={product.prodName}
                className="rounded-xl shadow-lg "
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="content ">
              <h1 className="text-4xl font-bold">{product.prodName}</h1>
              <h3 className="mb-4 font-f-secondary">{product.category}</h3>
              <p className="font-f-secondary">{product.desc}</p>

              <div className="mt-9 flex items-center">
                <Button
                  variant="contained"
                  className="flex gap-2"
                  sx={{
                    backgroundColor: "#256D85",
                    ":hover": { color: "white", backgroundColor: "#47B5FF" },
                  }}
                  onClick={addToCart}
                >
                  <ShoppingCartIcon sx={{ fontSize: "1.2rem" }} />
                  <CurrencyFormatter price={product.price}/>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
