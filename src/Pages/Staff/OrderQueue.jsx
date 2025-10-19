import React, { useState, useEffect, useRef } from 'react';

function OrderQueue() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    
    const initialOrders = [
      { id: 1, table: 5, items: ['Classic Burger', 'Fries'], status: 'pending', time: '10:30 AM', total: 250 },
      { id: 2, table: 3, items: ['Margherita Pizza', 'Coke'], status: 'preparing', time: '10:35 AM', total: 380 },
      { id: 3, table: 7, items: ['Chicken Wrap', 'Sprite'], status: 'ready', time: '10:40 AM', total: 220 }
    ];
    setOrders(initialOrders);

    
    const interval = setInterval(() => {
      const newOrder = {
        id: Date.now(),
        table: Math.floor(Math.random() * 10) + 1,
        items: ['New Item ' + Math.floor(Math.random() * 100)],
        status: 'pending',
        time: new Date().toLocaleTimeString(),
        total: Math.floor(Math.random() * 500) + 100
      };
      
      setOrders(prev => [newOrder, ...prev]);
      
      
      if (soundEnabled && audioRef.current) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const getFilteredOrders = () => {
    if (filter === 'all') return orders;
    return orders.filter(order => order.status === filter);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800',
      preparing: '#2196f3',
      ready: '#4caf50',
      served: '#9e9e9e'
    };
    return colors[status] || '#000';
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      pending: 'preparing',
      preparing: 'ready',
      ready: 'served'
    };
    return statusFlow[currentStatus];
  };

  return (
    <div className="order-queue">
      <audio ref={audioRef}>
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLYiTcIGWi77eefTRAMUKfj8LZjHAY4ktjzzHotBSN4yPDaj0EKFF607emnVRkKRp/h8r5sIQQtgs/y2Ik3CBlou+3nn00QDFCn4/C2YxwGOJLZ886BLAUmeNzx2YlBChNcte3pp1kXCkOf4fO+ayIELYLP8tiJNwgZaLvt559NEAxQqOPwtmMcBjiS2fPOgSwFJnjc8dmJQQoTXLXt6adZFwpDn+HzvmsiBC+C0PLXiTYJGWi77OefTRENUKjj8LZjHAY4ktnzzogsBSZ43PHZikEKFVy17OnnWhgKPqDh871sIgQugs/y2Ig3CBlpu+znolEQDFCo4/C2YxwGOJLZ886HLAYleNzx2YpAChVctOzp51oYCj6f4PO+bCIELoLP8tiJNggZaLvt6KFREAxQqOPwtmMcBjiS2PPOhywGJXjc8dmKQAoVXLTs6eddGAo+n+Dzv2wiBDCDz/PXiTYJGGi77OihURAMUKjj8LZjHAY4kdjzzogsBiV33PHZikALFVu07OnnXRgKPp/g879sIgQwg8/z14k2CRhou+zooVEQDFCo4/C2YxwGOJHY886ILAYld9zx2YpAChVbtOzp510YCj6f4fO/bSIEL4LP8tiJNggZaLvt6J9NEAxPp+LwtmMcBjiS2PPOhywGJXfc8dmKQAoVW7Ts6eddGAo+n+Dzv20iBDCDz/PXiTYJGWi77OifTRAMT6fi8LZjHAU5ktjzzogsBiV33PHZikALFVu07OnnXRgKPqDh87+mLQUxg8/z14k2CBhou+znoE0QDFA=" type="audio/wav" />
      </audio>
      
      <div className="queue-header">
        <h1>Order Queue</h1>
        <div className="queue-controls">
          <label className="sound-toggle">
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
            />
            Sound Alerts
          </label>
        </div>
      </div>

      <div className="filter-tabs">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All Orders ({orders.length})
        </button>
        <button 
          className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}
        >
          Pending ({orders.filter(o => o.status === 'pending').length})
        </button>
        <button 
          className={filter === 'preparing' ? 'active' : ''}
          onClick={() => setFilter('preparing')}
        >
          Preparing ({orders.filter(o => o.status === 'preparing').length})
        </button>
        <button 
          className={filter === 'ready' ? 'active' : ''}
          onClick={() => setFilter('ready')}
        >
          Ready ({orders.filter(o => o.status === 'ready').length})
        </button>
        <button 
          className={filter === 'served' ? 'active' : ''}
          onClick={() => setFilter('served')}
        >
          Served ({orders.filter(o => o.status === 'served').length})
        </button>
      </div>

      <div className="orders-grid">
        {getFilteredOrders().map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="table-number">Table {order.table}</span>
              <span 
                className="order-status"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {order.status}
              </span>
            </div>
            
            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item">• {item}</div>
              ))}
            </div>

            <div className="order-footer">
              <span className="order-time">{order.time}</span>
              <span className="order-total">₹{order.total}</span>
            </div>

            {order.status !== 'served' && (
              <button
                className="status-btn"
                onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
              >
                Mark as {getNextStatus(order.status)}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderQueue;
