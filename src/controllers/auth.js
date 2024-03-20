import { signupSchema, signinSchema } from "../schemas/auth";
import bcrytjs from 'bcryptjs'; // mã hóa mật khẩu
import User from "../model/user";
import jwt from 'jsonwebtoken'
export const signup = async (req, res) => {
    try {
        // lấy dữ liệu từ client gửi lên: req.body
        const { username, email, password, age } = req.body;

        // kiểm tra dữ liểu từ client gửi lên có đúng với schema không
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                messages: errors,
            });
        }

        // nếu đúng, thì kiểm tra email có tồn tại trong db chưa
        const exitUser = await User.findOne({ email });
        if (exitUser) {
            return res.status(400).json({ messages: "Email đã tồn tại" })
        };

        // nếu chưa -> mã hóa mật khẩu sử dụng bcryptjs
        const hasdedPassword = await bcrytjs.hash(password, 10);

        // tạo mới user User.create({ name, email, password: Mã Hóa, age})
        const user = await User.create({ ...req.body, password: hasdedPassword })
        console.log(user)

        // trả về thông tin user đã đăng ký ( không gửi về mật khẩu)
        user.password = undefined;
        return res.status(201).json({
            messages: "Đăng ký thành công",
            user,
        })
    } catch (error) {
        return res.status(400).json({
            messages: error.message,
        });
    }
}

export const signin = async (req, res) => {
    try {
        // Nhận dữ liệu gửi lên từ client
        const { email, password } = req.body;

        // Kiểm tra thông tin có hợp lệ không
        const { error } = signinSchema.validate(req.body, { abortEarly: false });

        // Nếu dl không hợp lệ, -> gửi thông báo về client
        if (error) {
            const messages = error.details.map((error) => error.message);
            return res.status(400).json({ messages, })
        }

        // kiểm tra xem user có tồn tại trong hệ thống không
        const user = await User.findOne({ email });
        console.log("user", user)
        // Nếu không tồn tại, trả thông báo về client
        if (!user) {
            return res.status(400).json({ message: "Email khong ton tai" });
        }
        // kiểm tra xem mật khẩu có đúng không?
        const isMatch = bcrytjs.compare(password, user.password);
        console.log(isMatch)
        //Nếu mật khẩu không đúng, trả về thông báo cho client 
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng!",
            })
        }
        // Tạo token và trả về client để client có thể gửi token này cho các request sau
        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1h" });
        user.password = undefined;
        return res.status(200).json({ message: "Đăng nhập thành công", user, token });

    } catch (error) {
        return res.status(400).json({ error: error.message, })
    }
}