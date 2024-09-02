import ContactModel from "../../Models/contact";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      console.log("Received POST request");
      console.log("Request Body:", req.body);

      const newContact = await ContactModel.create({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
      });

      console.log("New Contact Form:", newContact);
      res.status(201).json({ success: true, data: newContact });
    } else {
      console.log("Received GET request");
      const contacts = await ContactModel.find();
      console.log("Retrieved Contacts:", contacts);
      res.status(200).json({ success: true, data: contacts });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
