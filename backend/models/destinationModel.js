const mongoose = require('mongoose')

const destinationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        destination: {
            type: String,
            required: [true, 'Please add a destination']
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Destination', destinationSchema)