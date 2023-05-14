import express from "express";
import * as contactController from "./contact.controller.js";
export const contactRouter = express.Router();
contactRouter
  .route("/")
  .post(contactController.createContact)
  .get(contactController.getAllContacts)

contactRouter
  .route("/:id")
  .put(contactController.updateContact)
  .get(contactController.getContact)
  .delete(contactController.deleteContact);
