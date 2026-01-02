import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get('orderId')
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post("http://localhost:3000/api/order/verify-order", { success, orderId });
    if (response.data.success) {
      navigate("/myorder");
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    verifyPayment();
  }, [])

  return <div className="verify">
    <div className="spinner"></div>
  </div>;
};

export default Verify;
