const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
	to: [RecipientSchema],
	from: String,
	header: String,
	subject: String,
	text: String,
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: "User" },
	dateSent: Date,
	lastResponded: Date,
});

mongoose.model("surveys", surveySchema);
