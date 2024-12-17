const UserSubscriptionSchema = require('../Schema/UserSubscriptionSchema'); // Correct the model path if needed

// verifySubscription.js middleware
const verifySubscription = async (req, res, next) => {
    const { userid } = req.params;

    try {
        const subscription = await UserSubscriptionSchema.findOne({ userId: userid, isSubscribed: true });

        if (!subscription || new Date() > subscription.expiryDate) {
            return res.status(403).json({ msg: "Access denied. Please subscribe to view movies." });
        }

        next();
    } catch (error) {
        console.error('Subscription Verification Error:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


module.exports = verifySubscription;
