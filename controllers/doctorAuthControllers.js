const Doctor = require("../models/doctor");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/createToken");
const maxAge = 3 * 24 * 60 * 60;
module.exports.doctor_register = async (req, res) => {
  const education = Object.values(req.body.education);
  const specialization = Object.values(req.body.specialization);
  const {
    name,
    org,
    orgAddress,
    dob,
    mobile,
    email,
    adharCard,
    bloodGroup,
    address,
    password,
    orgNumber,
    emergencyno,
  } = req.body;
  try {
    const doctor = await Doctor.create({
      name,
      org,
      orgAddress,
      dob,
      mobile,
      email,
      adharCard,
      bloodGroup,
      education,
      address,
      password,
      specialization,
      orgNumber,
      emergencyno,
    });

    res.status(200).json({ doctor });
  } catch (err) {
    res.status(404).json({ err });
  }
};

module.exports.doctor_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.login(email, password);
    const token = createToken(doctor._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ doctor });
  } catch (err) {
    res.status(404).json({ err });
  }
};

// module.exports.doctor_change_password = async (req, res) => {
//   // const { email, curr_password, new_password, confirm_password } = req.body
//   const email = 'yogi@gmail.com'
//   const curr_password = 'Yogi@123'
//   const new_password = 'ogi@123'
//   const confirm_password = 'ogi@123'

//   try {
//     console.log("changing password")
//     const doctor = await Doctor.change_password(email, curr_password, new_password, confirm_password);
//     // const token = createToken(doctor._id);
//     // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
//     res.status(200).json({ doctor });
//   } catch (err) {
//     console.log(err)
//     res.status(404).json({ err });
//   }


// }
