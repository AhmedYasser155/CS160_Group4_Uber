import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;
    // reading
    switch(method) {
        case "GET":
            try {
                const user = await User.findById(id);

            if(!user) {
                return res.status(400).json({ success: false });
            }

            res.status(200).json({ success: true, data: user });
        } catch (error) {
            res.status(400).json({ success: false });
        }
        break;
        // updating
        case "PUT":
            try {
                // const {firstName,lastName,email,password,phoneNumber} = req.body;
                // if ((!firstName, !lastName, !email, !password, !phoneNumber)) throw "invalid data";
                // await User.updateOne({ _id: UserID }, { firstName,lastName,email,password,phoneNumber })
                const user = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!user) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: user})
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false, error})
            }
            break;
        // deleting 
        case "DELETE":
            try {
                const deleted = await User.deleteOne({ _id: id });

                if(!deleted) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} })
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false, error})
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}