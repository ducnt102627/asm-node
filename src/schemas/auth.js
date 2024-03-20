import Joi from "joi";

export const signupSchema = Joi.object({
    username: Joi.string().required().trim().messages({
        "any.required": "Username là bắt buộc",
        "string.empty": "Username không được để trống",
        "string.trim": "Username không được chứa khoảng trắng"
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email là bắt buộc",
        "string.email": "Email không đúng định dạng",
        "string.empty": "Email không được để trống",
    }),
    password: Joi.string().min(6).required().messages({
        "any.required": "Password là bắt buộc",
        "string.empty": "Password không được để trống",
        "string.min": "Password phải có ít nhất #(limit) ký tự",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Password không khớp",
        "any.required": "ConfirmPassword không được để trống",
    }),
    age: Joi.number().max(100).messages({
        "number.max": "Tuổi không được lớn hơn 100",
    })
})
export const signinSchema = Joi.object({

    email: Joi.string().email().required().messages({
        "any.required": "Email là bắt buộc",
        "string.email": "Email không đúng định dạng",
        "string.empty": "Email không được để trống",
    }),
    password: Joi.string().min(6).required().messages({
        "any.required": "Password là bắt buộc",
        "string.empty": "Password không được để trống",
        "string.min": "Password phải có ít nhất {#limit} ký tự",
    })
})