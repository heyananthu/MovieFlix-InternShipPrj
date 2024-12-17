const userSchema = require('./Schema/UserRegSchema')
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = 'your_secret_key';
const complaintSchema = require('./Schema/ComplaintSchema')
const cardSchema = require('./Schema/CardSchema')
const fs = require('fs');
const path = require('path');
const UserSubscriptionSchema = require('./Schema/UserSubscriptionSchema');
const subscriptionSchema = require('./Schema/SubscriptionSchema')

// const addUser = async (req, res) => {


//     const { name, email, phone, password } = req.body;
//     const img = req.file ? req.file.path : null;

//     try {
//         const newReg = { name, email, phone, img, password };
//         const Reg = await userSchema.create(newReg);

//         if (Reg) {
//             res.status(201).send({ message: 'User added successfully!', user: Reg });
//         } else {
//             res.status(400).send('Failed to add user.');
//         }
//     } catch (err) {
//         console.error(err); // Log the error for debugging
//         res.status(500).send({ error: 'Internal Server Error', details: err.message });
//     }
// };


const addUser = async (req, res) => {
    const { name, email, phone, password } = req.body;
    const img = req.file ? req.file.path : null;

    try {
        // Check if a user with the same email or phone already exists
        const existingUser = await userSchema.findOne({
            $or: [
                { email: email },
                { phone: phone }
            ]
        });

        if (existingUser) {
            // Return early to prevent further execution
            return res.status(400).send({
                error: 'User already exists with this email or phone.'
            });
        }

        // Create a new user
        const newReg = { name, email, phone, img, password };
        const Reg = await userSchema.create(newReg);

        if (Reg) {
            res.status(201).send({ message: 'User added successfully!', user: Reg });
        } else {
            res.status(400).send('Failed to add user.');
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
};




let userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userSchema.findOne({ email, password });
        if (user) {
            return res.json({
                status: "success",
                message: "User exists",
                userId: user._id.toString(),
            });
        } else {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

let findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const userDetails = await userSchema.findById(userId);

        if (userDetails) {
            return res.json({
                status: "success",
                user: {
                    id: userDetails._id,
                    name: userDetails.name,
                    email: userDetails.email,
                    phone: userDetails.phone,
                    img: userDetails.img
                },
            });
        } else {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

let deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await userSchema.findByIdAndDelete(id)
        if (deleteUser) {
            res.status(200).json({ msg: "User deleted Successfully" })

            await complaintSchema.deleteMany({ sender: id })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Invalid error in userDelete" })
    }
}



let userView = async (req, res) => {
    const userList = await userSchema.find();
    res.json(userList);
};

let userReportCount = (async (req, res) => {
    const totalUser = await userSchema.countDocuments();
    res.json(totalUser)
})

let usercomplaint = async (req, res) => {
    const { message, userId } = req.body;

    if (!message) {
        res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const newComplaint = {
            sender: userId,
            message
        };

        const complaint = await complaintSchema.create(newComplaint);
        res.status(201).json({ msg: "Complaint successfully added" });
    } catch (err) {
        console.error("Error in the Complaint Router:", err);
        res.status(500).json({ msg: "Server error" });
    }
};

const getUserComplaint = async (req, res) => {
    try {
        const { userid } = req.params;

        const complaint = await complaintSchema.find({ sender: userid }).populate('sender', 'name email phone img');

        if (!complaint) {
            return res.status(404).json({ msg: "No complaints found for this user" });
        }

        res.status(200).json(complaint);
    } catch (err) {
        res.status(500).json({ msg: "Error on fetching complaints" });
    }
};


const complaintCount = ((async (req, res) => {
    const complaintCount = await complaintSchema.countDocuments()
    res.json(complaintCount)

}))

const deleteComplaint = (async (req, res) => {
    const { id } = req.params
    const deleteComplaint = await complaintSchema.findByIdAndDelete(id)
    if (deleteComplaint) {
        res.status(200).json({ msg: "complaint deleted Successfully" })
    }
})

const userCardDetails = (async (req, res) => {
    const { name, cardnumber, expiry, cvv } = req.body
    try {
        const newData = {
            name, cardnumber, expiry, cvv
        }
        const cardDetails = await cardSchema.insertMany(newData)
        if (cardDetails) {
            res.status(200).json({ msg: "Card Details added Successfully" })
        } else {
            res.status(404).json({ msg: "Failed to add card details" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "UnIdentified error Occur in Card Field" })

    }
})

const addUserSubscription = async (req, res) => {
    const { userid, subscriptionId } = req.params
    const { isSubscribed } = req.body

    const existingSubscription = await UserSubscriptionSchema.findOne({ userId: userid });
    if (existingSubscription) {
        res.status(404)
    } else {
        const newData = {
            userId: userid,
            subscriptionId: subscriptionId,
            isSubscribed,
            endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
        }
        console.log("Subscription Data :" + newData)
        const subscribed = await UserSubscriptionSchema.insertMany(newData);
        if (subscribed) {
            console.log(subscribed)
            res.status(200).json({ msg: "User Subscription added" })
        }
    }

}

const activeSubscription = async (req, res) => {
    const activeSubscriptionCount = await UserSubscriptionSchema.countDocuments()
    res.json(activeSubscriptionCount)

}

const usersubscriptiondetails = async (req, res) => {
    const { userId } = req.params;
    try {
        const findUserSubscription = await UserSubscriptionSchema.findOne({ userId }).populate('subscriptionId', 'title description price');

        // console.log("Fetched Subscription Details:", findUserSubscription);

        if (findUserSubscription) {
            res.status(200).json(findUserSubscription);
        } else {
            res.status(404).json({ message: 'No subscription details found for this user.' });
        }
    } catch (error) {
        console.error("Error fetching subscription details:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const subscriptionCheck = async (req, res) => {
    const { userId } = req.params;
    console.log("Received userId:", userId);

    try {
        const checkSubscription = await UserSubscriptionSchema.findOne({ userId });

        console.log("User subscription details: ", checkSubscription);

        if (checkSubscription) {
            // If a subscription is found, check if it's active
            if (checkSubscription.isSubscribed) {
                return res.status(200).json({ msg: 'User has an active subscription.' });
            } else {
                return res.status(400).json({ msg: 'User does not have an active subscription.' });
            }
        } else {
            return res.status(404).json({ msg: 'No subscription found for this user.' });
        }
    } catch (err) {
        console.error('Error fetching subscription details:', err);
        return res.status(500).json({ msg: 'An error occurred while checking the subscription.' });
    }
};



module.exports = {
    addUser, userLogin, userView, userReportCount, findUser, usercomplaint, getUserComplaint, complaintCount, deleteComplaint, deleteUser,
    userCardDetails, addUserSubscription, activeSubscription, usersubscriptiondetails, subscriptionCheck
}