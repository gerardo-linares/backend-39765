import mongoose from "mongoose";

const cartsCollection = "carts";

const cartProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "products",
    },
    quantity: Number,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

cartProductSchema.pre("find", function () {
  this.populate("product");
});

const cartsSchema = new mongoose.Schema(
  {
    products: [cartProductSchema],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
