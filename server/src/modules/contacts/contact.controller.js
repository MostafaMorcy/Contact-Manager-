import contactModel from "../../../database/models/contact.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFeatures } from "./../../utils/ApiFeatures.js";
const createContact = catchAsyncError(async (req, res) => {
  let result = new contactModel(req.body);
 await  result.save();
  res.json({ message: "success" });
});

const getAllContacts = catchAsyncError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(contactModel.find(), req.query)
    .paginate()
    .field()
    .search()
    .sort()
    .filter();

  let result = await apiFeatures.mongooseQuery;
  !result && next(new AppError(`contact not found`, 404));
  result && res.json({ message: "success", result, page: apiFeatures.page });
});
const getContact = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await contactModel.findById(id);
  !result && next(new AppError(`Contact not found`, 404));
  result && res.json({ message: "success", result });
});
const updateContact = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
let result = await contactModel.findByIdAndUpdate(
  id,
  req.body,
  { new: true }
);
!result && next(new AppError(`Contact not found`, 404));
result && res.json({ message: "success", result });
})
const deleteContact = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
    let result = await contactModel.findByIdAndDelete(id);
    !result && next(new AppError(`Document not found`, 404));
    result && res.json({ message: "success", result });
});
export {
  createContact,
  getAllContacts,
  updateContact,
  getContact,
  deleteContact,
};
