import mongoose from 'mongoose'
import Userprofiles from 'src/server/models/userprofiles'
import Messages from 'src/server/models/messages'

let WorkingStationsSchema = new mongoose.Schema({
	administrator : {type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles'},
	participants : [{type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles'}],
	station_subject : String,
	station_title : String,
	room_id : String,
	typeOfChat : Number,
	messages : [Messages.schema],
	createdAt: {type: Date, default: Date.now}
})

export default mongoose.model('WorkingStations', WorkingStationsSchema)