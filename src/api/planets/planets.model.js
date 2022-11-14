const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const planetSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    image: {
      type: String,
      required: true,
      default: "https://freepikpsd.com/file/2019/10/alien-cartoon-png-1-Transparent-Images.png",
    },
    description: { type: String, required: true, trim: true },
    gravity: { type: String, required: false },
    distance: { type: String, required: false },
    price: { type: String, trim: true },
    moon: { type: Boolean}
  },
  {
    timestamps: true,
  }
);
const Planet = mongoose.model("planets", planetSchema);
module.exports = Planet;
