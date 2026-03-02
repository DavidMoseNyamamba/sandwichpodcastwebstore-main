import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import PropTypes from "prop-types";
import { PageLoading, InlineLoading } from "../components/Loading";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const fetchAllOrders = useCallback(async () => {
    if (!token) {
      return null;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [token]);
 
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    // Optimistic update so the select reflects change immediately
    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
    );

    setUpdatingOrderId(orderId);
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: newStatus },
        { headers: { token } }
      );

      // Backend may return { success: true, order } or the order directly.
      const updatedOrder = response.data?.order || (response.data && response.data._id ? response.data : null);

      if (updatedOrder) {
        // Reconcile with server truth
        setOrders((prev) => prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)));
      } else if (response.data && response.data.success === false) {
        // Backend explicitly failed: show error and refresh list
        toast.error(response.data.message || "Failed to update status");
        await fetchAllOrders();
      } else if (response.status !== 200) {
        // Non-OK HTTP status
        toast.error("Failed to update status");
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      // Revert optimistic update by refetching
      await fetchAllOrders();
      toast.error(error.message);
    } finally {
      setUpdatingOrderId(null);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token, fetchAllOrders]);

  if (loading) {
    return <PageLoading text="Loading orders..." />;
  }

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 "
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size} ,</span>
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipCode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Payment Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Paid" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              {order.mpesaCode && (
                <p className="mt-2 font-medium text-green-600">M-Pesa Code: {order.mpesaCode}</p>
              )}
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <div className="flex items-center">
              <select 
                onChange={(event) => statusHandler(event, order._id)} 
                value={order.status} 
                className="p-2 font-semibold"
                disabled={updatingOrderId === order._id}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              {updatingOrderId === order._id && (
                <InlineLoading size="sm" className="ml-2" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Orders.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Orders;
