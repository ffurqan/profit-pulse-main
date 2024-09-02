import reviewsModel from "../../Models/reviews";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      console.log("Received POST request");
      console.log("Request Body:", req.body);

      const newReview = await reviewsModel.create({
        name: req.body.name,
        message: req.body.message,
      });

      console.log("New Review : ", newReview);
      res.status(201).json({ success: true, data: newReview });
    } else {
      console.log("Received GET request");
      const contacts = await reviewsModel.find();
      console.log("Retrieved Reviews:", contacts);
      res.status(200).json({ success: true, data: contacts });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
