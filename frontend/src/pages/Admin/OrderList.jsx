import { useEffect, useState } from 'react';
import api from '../../api';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/shop/orders')
      .then(res => setOrders(res.data.orders || []))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Orders</h2>
      <ul className="list-group">
        {orders.map(o => (
          <li key={o._id} className="list-group-item">
            <div className="fw-semibold">{o.customer?.firstName} {o.customer?.lastName}</div>
            <div>{o.customer?.address}</div>
            <div>Status: {o.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
