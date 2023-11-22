const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const { db } = require("./admin");

const doctorSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: [true, "Please enter full Name"],
    },
    middleName: {
      type: String,
      required: [true, "Please enter full Name"],
    },
    surName: {
      type: String,
      required: [true, "Please enter full Name"],
    },
  },
  org: {
    type: String,
    required: [true, "Please enter Hospital of clinic name."],
  },
  orgAddress: {
    building: {
      type: String,
      required: [true, "Please enter complete Address of contact person"],
    },
    city: {
      type: String,
      required: [true, "Please enter complete Address of contact person"],
    },
    taluka: {
      type: String,
      required: [true, "Please enter complete Address of contact person"],
    },
    district: {
      type: String,
      required: [true, "Please enter complete Address of contact person"],
    },
    state: {
      type: String,
      required: [true, "Please enter complete Address of contact person"],
    },
    pincode: {
      type: Number,
      required: [true, "Please Enter complete Address of contact person"],
    },
  },
  dob: {
    type: Date,
    required: [true, "Please enter Date of Birth"],
  },
  mobile: {
    type: String,
    required: [true, "Please enter Mobile Number"],
    minlength: [10, "Please Enter a valid Mobile Number"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: [true, "Email already Exist"],
    validate: [isEmail, "Please Enter a valid Email"],
  },
  adharCard: {
    type: Number,
    unique: [true, "This AdharCard is already Registerd on System."],
    required: [true, "Pleasee enter AdharCard Number"],
    minlength: [12, "Please enter an valid AdharCard Number"],
  },
  bloodGroup: {
    type: String,
    required: [true, "Please enter Blood Group"],
  },
  education: [
    {
      degree: {
        type: String,
      },
    },
  ],
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [8, "Minimum length of password should must be 8 characters"],
  },
  address: {
    building: {
      type: String,
      required: [true, "Please enter complete Address of contact person"],
    },
    city: {
      type: String,
      required: [true, "Please enter complete Address of contact person"],
    },
    taluka: {
      type: String,
      required: [true, "Please enter complete Address of contact person"],
    },
    district: {
      type: String,
      required: [true, "Please enter complete Address of contact person"],
    },
    state: {
      type: String,
      required: [true, "Please enter complete Address of contact person"],
    },
    pincode: {
      type: Number,
      required: [true, "Please Enter complete Address of contact person"],
    },
  },
  specialization: [
    {
      special: {
        type: String,
      },
    },
  ],
  emergencyno: {
    type: String,
    required: [true, "Please enter Mobile Number"],
    minlength: [10, "Please Enter a valid Mobile Number"],
  },
  orgNumber: {
    type: String,
    required: [true, "Please enter Mobile Number"],
    minlength: [10, "Please Enter a valid Mobile Number"],
  },
});

doctorSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// doctorSchema.pre("findOneAndUpdate", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this._update.password = await bcrypt.hash(this._update.password, salt)
//   next();
// })

doctorSchema.statics.login = async function (email, password) {
  const doctor = await this.findOne({ email });
  if (doctor) {
    const auth = await bcrypt.compare(password, doctor.password);
    if (auth) {
      return doctor;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Invalid email");
};

// doctorSchema.statics.change_password = async function (email, curr_password, new_password, confirm_password) {
//   console.log("came till here")
//   const doctor = await this.findOne({ email: email });

//   console.log("doctor", doctor)

//   if (!curr_password || !new_password || !confirm_password) throw Error("All fields are mandatory")
//   if (!bcrypt.compareSync(curr_password, doctor.password)) throw Error("Incorrect Old Password")
//   if (new_password !== confirm_password) throw Error("Password doesn't match")

//   this.findOneAndUpdate(
//     { email: email },
//     { password: new_password },
//     { useFindAndModify: false }
//   );

// }

const Doctor = mongoose.model("doctor", doctorSchema);

module.exports = Doctor;
