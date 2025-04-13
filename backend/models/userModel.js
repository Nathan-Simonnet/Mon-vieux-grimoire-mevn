import mongoose from "mongoose";
import uniqueValidator  from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
    email:{type: String, required: true, uniqueCaseInsensitive : true},
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);
export default mongoose.model('User', userSchema);








//     email: { type: String, index: true, unique: true, required: true, uniqueCaseInsensitive: true}