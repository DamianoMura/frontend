import React from "react";
import "../styles/BillingSection.css";

export default function BillingSection({
  order,
  setOrder,
  discountCode,
  setDiscountCode,
  handleApplyDiscount,
  discountMsg,
  appliedDiscount,
}) {
  return (
    <div>
      <div className="checkout-section mb-1">
        <h4>Customer Details</h4>
        <label className="form-label">Customer Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Name and Surname"
          required
          value={order.customer_name || ""}
          onChange={(e) =>
            setOrder({ ...order, customer_name: e.target.value })
          }
        />

        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          required
          value={order.customer_email || ""}
          onChange={(e) =>
            setOrder({ ...order, customer_email: e.target.value })
          }
        />
      </div>

      <div className="checkout-section mb-1">
        <h4>Shipping Details</h4>

        <label className="form-label">Street</label>
        <input
          type="text"
          className="form-control"
          placeholder="Street"
          required
          value={order.address_street || ""}
          onChange={(e) =>
            setOrder({ ...order, address_street: e.target.value })
          }
        />

        <label className="form-label">Street Number</label>
        <input
          type="text"
          inputMode="numeric"
          className="form-control"
          placeholder="Street Number"
          required
          value={order.address_street_number ?? ""}
          onChange={(e) =>
            setOrder({ ...order, address_street_number: e.target.value })
          }
        />

        <label className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          placeholder="City"
          required
          value={order.address_city || ""}
          onChange={(e) => setOrder({ ...order, address_city: e.target.value })}
        />

        <label className="form-label">Postal Code</label>
        <input
          type="text"
          className="form-control"
          placeholder="Postal Code"
          required
          value={order.postal_code || ""}
          onChange={(e) => setOrder({ ...order, postal_code: e.target.value })}
        />

        <label className="form-label">Country</label>
        <input
          type="text"
          className="form-control"
          placeholder="Country"
          required
          value={order.country || ""}
          onChange={(e) => setOrder({ ...order, country: e.target.value })}
        />

        <div className="d-flex align-items-center mt-2 mb-1">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Codice sconto"
            value={discountCode || ""}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleApplyDiscount}
            disabled={!discountCode || !discountCode.trim()}
          >
            Apply
          </button>
        </div>

        {discountMsg && (
          <div
            className={`mt-1 ${
              appliedDiscount ? "text-success" : "text-danger"
            }`}
          >
            {discountMsg}
          </div>
        )}
      </div>
    </div>
  );
}
