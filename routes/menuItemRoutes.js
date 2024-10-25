const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");
const { route } = require("./personRoutes");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("Response fatched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid tasteType" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const updatedMenuItemId = req.body;

    const response = await MenuItem.findByIdAndUpdate(
      menuItemId,
      updatedMenuItemId,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "MenuItem Not Found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuItemId);
    if (!response) {
      return res.status(404).json({ message: "MenuItem Not Found" });
    }
    console.log("data delete");
    res.status(200).json({ messgae: "Person Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
