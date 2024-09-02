import ServicesModel from "../../Models/services";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      // Handle adding a new service
      const newService = await ServicesModel.create({
        name: req.body.name,
        desc: req.body.desc,
      });
      res.status(201).json({ success: true, data: newService });
    } else if (req.method === "GET") {
      // Handle fetching services
      const services = await ServicesModel.find();
      res.status(200).json({ success: true, data: services });
    } else if (req.method === "DELETE") {
      // Handle deleting a service
      const { id } = req.body; // Use req.body to get the ID from the frontend
      const deletedService = await ServicesModel.findByIdAndDelete(id);

      if (!deletedService) {
        return res
          .status(404)
          .json({ success: false, error: "Service not found" });
      }

      res.status(200).json({ success: true, data: deletedService });
    } else {
      res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
